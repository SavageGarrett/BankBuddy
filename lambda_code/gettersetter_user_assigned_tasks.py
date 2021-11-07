import sys
import logging
import psycopg2
import json
#rds settings
rds_host  = "database-1.c5nd4goqrleo.us-east-2.rds.amazonaws.com"
name = "ttl24"
password = "TTTTLLLL"
db_name = "postgres"

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
    if not event['body'] == None:
        data_val = json.loads(event['body'])
    result = ""
    if event['httpMethod'] == "GET":
        cur.execute("""SELECT * FROM public.user_assigned_tasks WHERE user_id_fk = %s;""", ([data_val['user_id_fk']]))
        result = cur.fetchone()
        conn.commit()
        cur.close()
    elif event['httpMethod'] == "POST":
        if "old_task_id" in data_val.keys():
            cur.execute("""UPDATE public.user_assigned_tasks SET task_id_fk = %s WHERE task_id_fk = %s;""", (data_val['new_task_id'],data_val['old_task_id']))
        conn.commit()
        cur.close()
    elif event['httpMethod'] == "PUT":
        cur.execute("""INSERT INTO public.user_assigned_tasks VALUES(%s, %s);""", (data_val['task_id_fk'],data_val['user_id_fk']))
        conn.commit()
        cur.close()
    if conn is not None:
        conn.close()
    transactionResponse = {}
    responseObject = {}
    responseObject['statusCode'] = 200
    responseObject['headers'] = {}
    responseObject['headers']['Content-Type'] = 'application/json'
    if result != "":
        responseObject['body'] = json.dumps(result)
    else:
        responseObject['body'] = json.dumps(transactionResponse)
    return responseObject
