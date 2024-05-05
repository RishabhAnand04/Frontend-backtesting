import pandas as pd 
import numpy as np 
import pandas_ta as ta
import nsepython as nse
from datetime import date
import yfinance as yf
import Cbacktest 
import time
import threading
import concurrent.futures
import json
import multiprocessing
if __name__ == '__main__':
    stock = yf.Ticker('MSFT')
    print('fetching data')
    data = stock.history(period = 'max')
    close = list(data['Close'])
    print(len(close))
    k = int(len(close)/4)
    chunk1 = list(data['Close'][:k])
    chunk2 = list(data['Close'][k+1:2*k])
    chunk3 = list(data['Close'][2*k + 1: 3* k])
    chunk4 = list(data['Close'][3*k + 1:4*k])

    # chunk8 = list(data['Close'][7*k + 1:])
    # chunk5 = list(data['Close'][4*k + 1: 5* k])
    # chunk6 = list(data['Close'][5*k + 1: 6* k])
    # chunk7 = list(data['Close'][6*k + 1: 7* k])

    buyDict = {
        'Ind1' : ['ta.rsi(pd.Series(close) ,12)'],
        'ops' : ['>'],
        'Ind2' : ['73.0'], 
        'cand1' : ['-1'], 
        'cand2' : ['-1'], 
        'andOr' : ['-']
    }

    sellDict = {
        'Ind1' : ['ta.rsi(pd.Series(close) ,12)'],
        'ops' : ['<'],
        'Ind2' : ['53.0'], 
        'cand1' : ['-1'], 
        'cand2' : ['-1'], 
        'andOr' : ['-']
    }

    sl = 0.0
    target = 1000.0
    exittime = 'ahaj'

    # pool = concurrent.futures.ThreadPoolExecutor(max_workers=10)
    conditions = []
    start_time = time.time()
    # details = Cbacktest.thread_pool(buyDict,close,sellDict,exittime,sl,target)
    # end_time = time.time()
    # print('time taken -> ',end_time - start_time)
    start_time = time.time()
    global q1, q2,q3,q4
    q1 = []
    q2 = []
    q3 = []
    q4 = []
    print(type (q1))
    p1 = multiprocessing.Process(target=Cbacktest.calculate_pnl_cython,args=(buyDict,chunk1,sellDict,exittime,sl,target,q1))
    p2 = multiprocessing.Process(target=Cbacktest.calculate_pnl_cython,args=(buyDict,chunk2,sellDict,exittime,sl,target,q2))
    p3 = multiprocessing.Process(target=Cbacktest.calculate_pnl_cython,args=(buyDict,chunk3,sellDict,exittime,sl,target,q3))
    p4 = multiprocessing.Process(target=Cbacktest.calculate_pnl_cython,args=(buyDict,chunk4,sellDict,exittime,sl,target,q4))
    p1.start()
    p2.start()
    p3.start()
    p4.start()
    p1.join()
    p2.join()
    p3.join()
    p4.join()

    running = True 
    while running:
        if p4.is_alive() == False :
            running = False
    print(q1)
    end_time = time.time()

    print('time_taken' , end_time - start_time)

    # print(eval(f"{sellDict['Ind1'][0]}"))