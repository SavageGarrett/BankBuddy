import sys
import logging
import psycopg2
import json
#rds settings
rds_host  =
name = 
password = 
db_name = 

def lambda_handler(event, context):
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    try:
        conn = psycopg2.connect(
            database=db_name,
            user=name,
            password=password,
            host=rds_host,
            port='5432'
        )
        cur = conn.cursor()
    except Exception as e:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()
    
    logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
    #print(type(event['body']))
    #if 'body' in event.keys():
    data_val = json.loads(event['body'])
    result = ""
    if event['httpMethod'] == "GET":
        cur.execute("""SELECT * FROM public.tasks WHERE tasks_id = %s;""", ([data_val['task_id']]))
        result = cur.fetchone()
        conn.commit()
        cur.close()
    elif event['httpMethod'] == "POST":
        if "complete" in data_val.keys():
            cur.execute("""UPDATE public.tasks SET complete = %s WHERE tasks_id = %s;""", (data_val['complete'],data_val['task_id']))
            #print(type(data_val['complete']))
            if data_val['complete'] == True:
                cur.execute("""SELECT cur_value FROM public.tasks WHERE tasks_id = %s;""",([data_val['task_id']]))
                cur_value = cur.fetchone()
                cur.execute("""SELECT cash_balance FROM public.users WHERE users_id = 2;""")
                cash_balance = cur.fetchone()
                update_val = str(int(cur_value[0]) + int(cash_balance[0]))
                #cur.execute("""UPDATE public.users SET cash_balance = %s WHERE users_id = 2;""", ([update_val]))
                cur.execute("""SELECT user_account_balance FROM public.users WHERE users_id = 2;""")
                account_balance = cur.fetchone()
                update_val = str(int(cur_value[0]) + int(account_balance[0]))
                cur.execute("""UPDATE public.users SET user_account_balance = %s WHERE users_id = 2;""", ([update_val]))
        if "cur_value" in data_val.keys():
            cur.execute("""UPDATE public.tasks SET cur_value = %s WHERE tasks_id = %s;""", (data_val['cur_value'],data_val['task_id']))
        if "subtract_user_account_balance" in data_val.keys():
            cur.execute("""SELECT user_account_balance FROM public.users WHERE users_id = 2;""")
            account_balance = cur.fetchone()
            account_balance = account_balance[0]
            cur.execute("""SELECT cash_balance FROM public.users WHERE users_id = 2;""")
            cash_balance = cur.fetchone()
            cash_balance = cash_balance[0]
            account_balance -= int(data_val['subtract_user_account_balance'])
            cash_balance += int(data_val['subtract_user_account_balance'])
            cur.execute("""UPDATE public.users SET user_account_balance = %s WHERE users_id = 2;""", ([account_balance]))
            cur.execute("""UPDATE public.users SET cash_balance = %s WHERE users_id = 2;""", ([cash_balance]))
        if "subtract_cash_balance" in data_val.keys():
            cur.execute("""SELECT user_account_balance FROM public.users WHERE users_id = 2;""")
            account_balance = cur.fetchone()
            account_balance = account_balance[0]
            cur.execute("""SELECT cash_balance FROM public.users WHERE users_id = 2;""")
            cash_balance = cur.fetchone()
            cash_balance = cash_balance[0]
            account_balance += int(data_val['subtract_cash_balance'])
            cash_balance -= int(data_val['subtract_cash_balance'])
            cur.execute("""UPDATE public.users SET user_account_balance = %s WHERE users_id = 2;""", ([account_balance]))
            cur.execute("""UPDATE public.users SET cash_balance = %s WHERE users_id = 2;""", ([cash_balance]))
        conn.commit()
        cur.close()
    elif event['httpMethod'] == "PUT":
        cur.execute("""INSERT INTO public.tasks VALUES(%s, %s, %s, %s);""", (data_val['task_name'],data_val['cur_value'],data_val['complete'],data_val['more_info']))
        conn.commit()
        cur.close()
    elif event['httpMethod'] == "PATCH":
        cur.execute("""SELECT * FROM public.tasks;""")
        result = cur.fetchall()
        conn.commit()
        cur.close()
    if conn is not None:
        conn.close()
    transactionResponse = {}
    responseObject = {}
    responseObject['statusCode'] = 200
    responseObject['headers'] = {'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Methods': 'OPTIONS,POST,PATCH,GET,PUT'}
    responseObject['headers']['Content-Type'] = 'application/json'
    if result != "":
        responseObject['body'] = json.dumps(result)
    else:
        responseObject['body'] = json.dumps(transactionResponse)
    return responseObject
