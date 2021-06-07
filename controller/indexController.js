const redis = require("redis");
const apiController = require("../utility/apiController");
const shortid = require('shortid');

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

// const GET_ASYNC = promisify(client.get).bind(client);
// const SET_ASYNC = promisify(client.set).bind(client);
// const {parse, stringify} = require('flatted');

class RedisNode {
  async redisPost(items) {
    try {
        client.hmset(items.userId,["name", items.name, "email", items.email, "phone", items.phone], (err, response)=> {
          if (err) {
            console.log(err.message);
          } else {
            console.log(response);
            return apiController.respondPost(response);
          }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  }
  async redisGet(){
      try {
        let return_dataset = []
        client.keys('*', (err, id) => {
            let multi = client.multi()
            let keys = Object.keys(id)
            let i = 0
        
            keys.forEach( (l) => {
              client.hgetall(id[l], (e, o) => {
                i++
                if (e) {console.log(e)} else {
                  temp_data = {'id':id[l],'data':o}
                  return_dataset.push(temp_data)
                }
        
                if (i == keys.length) {
                  let res={users:return_dataset}
                  console.log(res)
                  return apiController.respondGet(res);
                }
              })
            })
          })
      } catch (error) {
        console.log(error.message);
    }
  }

  async redisSingleGet(items){
    try {
        let id = items.id
        client.hgetall(id, (err, obj) => {
            if (!obj) {
              console.log(err.message);
              res.send('User does not exist') // if no user is associated with that id/key return this
            } else {
              obj.id = id
              console.log(obj)
              let res={
                'user': obj // if user is found return details
              }

              return apiController.respondGet(res);
            }
          })
    } catch (error) {
        console.log(error.message);
    }
  }
  async redisUpdate(items){
      try {
          let id = items.id
        client.hmset(id, [
            'name', items.name,
            'email', items.email,
            'phone', items.phone,
          ], (err, reply) => {
            if (err) {
              console.log(err)  // callback to log errors
            }
        
            console.log(reply)  // log success message
             // response to client
             return apiController.respondGet(reply);
          })
      } catch (error) {
          console.log(error.message);
      }
  }
  async redisDelete(items){
      try {
          let id = items.id
          console.log("ID=>",id)
            client.del(id, (err, reply) => {
            if (err) {
              console.log(err)  // callback incase something goes wrong
            }
            console.log(reply)  // log success message
            // res.send('User deleted successfully') // response back to the client
            return apiController.respondDelete("One record Deleted");
          })
      } catch (error) {
          
      }
  }
}

module.exports = new RedisNode();
