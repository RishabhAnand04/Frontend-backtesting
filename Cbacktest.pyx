# cython_code.pyx

cimport numpy as np
import numpy as np
import array as arr
import datetime as datetime
import pandas_ta as ta 
cimport pandas as pd 
import pandas as pd
import time
import json
import concurrent.futures
import multiprocessing


cpdef dict thread_pool(dict entryConditions , list close , dict exitConditions, str exitTime, double sl, double target,type(multipro) q):
    cdef int k = int(len(close)/4)
    cdef list chunk1 = (close[:k])
    cdef list chunk2 = (close[k+1:2*k])
    cdef list chunk3 = (close[2*k + 1: 3* k])
    cdef list chunk4 = (close[3*k + 1:4*k])
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executer:
        details1 = executer.submit(calculate_pnl_cython,entryConditions,chunk1,exitConditions,exitTime,sl,target,q)
        details2 = executer.submit(calculate_pnl_cython,entryConditions,chunk2,exitConditions,exitTime,sl,target,q)
        details3 = executer.submit(calculate_pnl_cython,entryConditions,chunk3,exitConditions,exitTime,sl,target,q)
        details4 = executer.submit(calculate_pnl_cython,entryConditions,chunk4,exitConditions,exitTime,sl,target,q)

        executer.shutdown(wait = True)
        print(json.loads(details1.result())['stats'])
        
        return json.loads(details1.result())['stats']

cpdef str calculate_pnl_cython(dict entryConditions , list close , dict exitConditions, str exitTime, double sl, double target,list q):
     
    # cdef np.ndarray[np.float64_t] pnl = np.zeros(n)
    cdef int position = 0
    cdef double entry_price = 0.0
    cdef bint checkBuy = True 
    cdef bint checksell = False
    cdef int trades = 0 
    cdef double commulativePnl = 0.0 
    cdef double currentPnl  = 0.0 
    cdef double exitPrice = 0.0 
    cdef int k = 0 
    cdef str recent = ''
    cdef bint tradeTaken = False
    cdef int nan = 0 
    cdef double prev_pnl = 0
    cdef double best_trade = 0
    cdef double worst_trade = 0
    cdef double max_drawdown = 0 
    cdef double curr_drawdown = 0 
    cdef int max_loosing_streak = 0 
    cdef int max_winning_streak = 0
    cdef int curr_loosing_streak = 0 
    cdef int curr_winning_streak = 0 
    
    
    #cdef list conditions = []
    #for i in range(0, len(entryConditions['Ind1'])):
    #    cdef str condition = eval(entryConditions['Ind1'][i] + ' ' + entryConditions['ops'][i] + ' ' + entryConditions['Ind2'][i]) 
    #    conditions.append(condition)
    trade_dict = {
        'entry' : [],
        'exit' : [],
        'pnl' : [],
        'commulative_pnl':[],
        'exit_condition' :[]
    }
    for i in range(0, len(close)):
        
        k = 0
        if checkBuy == True :
            tradeTaken = False
            #print('indicators length', len(entryConditions['Ind1']))
            while k  < len(entryConditions['Ind1']):
                
                
                # print(entryConditions['ops'][k])
                if type(eval(entryConditions['Ind2'][k])) == float :
                    recent = (str(eval(entryConditions['Ind1'][k])[i]) + ' ' + entryConditions['ops'][k] + ' ' + str(eval(entryConditions['Ind2'][k])))
                elif type(eval(entryConditions['Ind1'][k])) == float :
                    recent = (str(eval(entryConditions['Ind1'][k])) + ' ' + entryConditions['ops'][k] + ' ' + str(eval(entryConditions['Ind2'][k])[i]))
                else:   
                    recent = (str(eval(entryConditions['Ind1'][k])[i]) + ' ' + entryConditions['ops'][k] + ' ' + str(eval(entryConditions['Ind2'][k])[i]))
                
                
                #if ((entryConditions['Ind1'][k])[i]) == 'nan' or (entryConditions['Ind2'][k])[i] == 'nan' :
                #    break
                if entryConditions['andOr'][k] == 'and':
                    if eval(recent) == True:
                        k += 1 
                    elif eval(recent) == False :
                        break
                    
                
                elif entryConditions['andOr'][k] == 'or':
                    if eval(recent) == True and tradeTaken == False :
                        checkBuy = False
                        checksell = True
                        entry_price = close[i]
                        trades += 1
                        tradeTaken = True
                        k += 1

                    elif eval(recent) == False:
                        k+=1 
                    else:
                        k += 1
               
                elif entryConditions['andOr'][k] == '-':
                    if eval(recent) == True and tradeTaken == False:
                        checkBuy = False
                        checksell = True
                        entry_price = close[i]
                        trades += 1
                        k += 1

                    else:
                        k += 1
                else: 
                    k+=1 
        if checksell:
            
            # condition exit
            k = 0 
            while k  < len(exitConditions['Ind1']):
                if type(eval(exitConditions['Ind2'][k])) == float :
                    recent = (str(eval(exitConditions['Ind1'][k])[i]) + ' ' + exitConditions['ops'][k] + ' ' + str(eval(exitConditions['Ind2'][k])))
                elif type(eval(exitConditions['Ind1'][k])) == float :
                    recent = (str(eval(exitConditions['Ind1'][k])) + ' ' + exitConditions['ops'][k] + ' ' + str(eval(exitConditions['Ind2'][k])[i]))
                else:   
                    recent = (str(eval(exitConditions['Ind1'][k])[i]) + ' ' + exitConditions['ops'][k] + ' ' + str(eval(exitConditions['Ind2'][k])[i]))
                
                tradeTaken = False
                if exitConditions['andOr'][k] == 'and':
                    if eval(recent) == True:
                        k += 1 
                    elif eval(recent) == False :
                        break
                
                if exitConditions['andOr'][k] == 'or':
                    if eval(recent) == True and tradeTaken == False :
                        exitPrice = close[i]
                        checkBuy = True 
                        checksell = False
                        currentPnl = exitPrice - entry_price 
                        commulativePnl += currentPnl 
                        tradeTaken = True
                        if prev_pnl < 0.0:
                            if currentPnl < 0.0 :
                                curr_loosing_streak +=1 
                                curr_drawdown += currentPnl
                                if curr_drawdown < max_drawdown:
                                    max_drawdown = curr_drawdown
                                if curr_loosing_streak > max_loosing_streak:
                                    max_loosing_streak = curr_loosing_streak
                            elif currentPnl > 0.0 :
                                curr_drawdown = 0.0
                                curr_loosing_streak = 0 
                        elif prev_pnl >= 0.0 :
                            if currentPnl >= 0.0 :
                                curr_winning_streak += 1
                                if curr_winning_streak > max_winning_streak:
                                    max_winning_streak = curr_loosing_streak
                            elif currentPnl < 0.0:
                                curr_winning_streak = 0 
                        
                        elif currentPnl > 0.0 :
                            if currentPnl > best_trade :
                                best_trade = currentPnl 

                        elif currentPnl < 0.0 :
                            if currentPnl > worst_trade : 
                                worst_trade = currentPnl

                        trade_dict['entry'].append(entry_price)
                        trade_dict['exit'].append(exitPrice)
                        trade_dict['pnl'].append(currentPnl)
                        trade_dict['commulative_pnl'].append(commulativePnl)
                        trade_dict['exit_condition'].append(recent)
                        k += 1

                    elif eval(recent) == False:
                        k+=1 
                    else :
                        k += 1
               
                if exitConditions['andOr'][k] == '-':
                    if eval(recent) == True and tradeTaken == False:
                        exitPrice = close[i]
                        checkBuy = True 
                        checksell = False
                        currentPnl = exitPrice - entry_price 
                        commulativePnl += currentPnl 
                        if prev_pnl < 0.0:
                            if currentPnl < 0.0 :
                                curr_loosing_streak +=1 
                                curr_drawdown += currentPnl
                                if curr_drawdown < max_drawdown:
                                    max_drawdown = curr_drawdown
                                if curr_loosing_streak > max_loosing_streak:
                                    max_loosing_streak = curr_loosing_streak
                            elif currentPnl > 0.0 :
                                curr_drawdown = 0.0
                                curr_loosing_streak = 0 
                        elif prev_pnl >= 0.0 :
                            if currentPnl >= 0.0 :
                                curr_winning_streak += 1
                                if curr_winning_streak > max_winning_streak:
                                    max_winning_streak = curr_loosing_streak
                            elif currentPnl < 0.0:
                                curr_winning_streak = 0 
                        
                        elif currentPnl > 0.0 :
                            if currentPnl > best_trade :
                                best_trade = currentPnl 

                        elif currentPnl < 0.0 :
                            if currentPnl > worst_trade : 
                                worst_trade = currentPnl

                        k += 1
                        trade_dict['entry'].append(entry_price)
                        trade_dict['exit'].append(exitPrice)
                        trade_dict['pnl'].append(currentPnl)
                        trade_dict['commulative_pnl'].append(commulativePnl)
                        trade_dict['exit_condition'].append(recent)
                    else: 
                        k += 1
                
                else :
                    k+=1 
            #time Exit
            if close[i] <= sl or close[i] >= target:
                exitPrice = close[i]
                checkBuy = True 
                checksell = False
                currentPnl = exitPrice - entry_price 
                commulativePnl += currentPnl 

    details = {
        'start' : 0 , 
        'end' : commulativePnl,
        'trades' : trades,
        'max_drawdown' : max_drawdown,
        'winning_streak' :max_winning_streak,
        'loosing_streak' : max_loosing_streak,
        'best_trade' : best_trade,
        'worst_trade' : worst_trade
         
    }

    response = {
        'stats' : details,
        'trade_sheet' : trade_dict
    }
    q.append(json.dumps(response))    
    return json.dumps(response) 


        

    
    
 