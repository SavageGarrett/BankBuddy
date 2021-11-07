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
    print(event)
    print(context)
    #data_val = json.loads(event['body'])
    #print(data_val['user_id'])
    result = ""
    if event['httpMethod'] == "GET":
        #cur.execute("""SELECT * FROM public.users WHERE users_id = %s;""", ([data_val['user_id']]))
        cur.execute("""SELECT * FROM public.users WHERE users_id = 2;""")
        result = cur.fetchone()
        conn.commit()
        cur.close()
    elif event['httpMethod'] == "POST":
        if "user_account_balance" in data_val.keys():
            cur.execute("""UPDATE public.users SET user_account_balance = %s WHERE users_id = %s;""", (data_val['user_account_balance'],data_val['user_id']))
        if "cash_balance" in data_val.keys():
            cur.execute("""UPDATE public.users SET cash_balance = %s WHERE users_id = %s;""", (data_val['cash_balance'],data_val['user_id']))
        if "stocks_balance" in data_val.keys():
            cur.execute("""UPDATE public.users SET stocks_balance = %s WHERE users_id = %s;""", (data_val['stocks_balance'],data_val['user_id']))
        conn.commit()
        cur.close()
    elif event['httpMethod'] == "PUT":
        cur.execute("""INSERT INTO public.users VALUES(%s, %s, %s, %s, %s, %s);""", (data_val['is_parent'],data_val['first_name'],data_val['user_account_balance'],data_val['cash_balance'],data_val['stocks_balance'],data_val['last_name']))
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
