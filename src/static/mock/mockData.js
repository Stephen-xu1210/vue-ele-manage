var Mock = require('mockjs')
let data = Mock.mock({

      "userInfo|7":[{    //生成|num个如下格式名字的数据

          "id|+1":1,  //数字从当前数开始后续依次加一

          "name":"@cname",    //名字为随机中文名字

          "email":'@email',    //年龄为18-28之间的随机数字
          
          "number|123.10": 1123
      }]

    })

console.log(data)