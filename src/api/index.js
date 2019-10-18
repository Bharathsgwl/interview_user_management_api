import { version } from "../../package.json";
import { Router } from "express";

export default ({ config, db }) => {
  let api = Router();
  api.get("/post", (req, res) => {
    //find post_id in posts table and return the company
    db.query("SELECT * from post where status=true  ", (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
        res.json({ posts: response.rows });
      }
    });
  });
  // perhaps expose some API metadata at the root
  api.get("/post/:uuid", (req, res) => {
    //find post_id in posts table and return the company
    console.log(req.params.uuid, "uuid");
    db.query(
      `SELECT * from post where uuid='${req.params.uuid}'`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ question: response.rows });
        }
      }
    );
  });

  api.post("/post", (req, res) => {
    //take posts from req and insert into posts table
    const {
      post_name,
      created_by,
      updated_by,
      updated_time,
      status,
      threshold
    } = req.body;
    const uuid = require("uuid/v1");
    console.log(uuid(), "post");
    const created_time = new Date().getTime();
    console.log(created_time);
    db.query(
      `insert into post values('${uuid()}','${post_name}',true,'${threshold}','${created_by}','${created_time}')`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ status: "successfull", response: response.rows });
        }
      }
    );
  });

  api.put("/post/:uuid", (req, res) => {
    console.log("req", req.params);
    console.log("body", req.body);

    //take posts post_id from path and find the id and update
    const { post_name, updated_by, threshold } = req.body;
    const updated_time = new Date().getTime();
    db.query(
      `UPDATE post set post_name='${post_name}',threshold=${threshold},updated_by='${updated_by}',updated_time='${updated_time}' where uuid='${req.params.uuid}'`
    );
    res.json({ version, status: "live", method: "put" });
  });

  api.delete("/post/:uuid", (req, res) => {
    console.log("req", req.params);
    //take posts id from path and find the id and update flag
    db.query(`update post set status=false where uuid='${req.params.uuid}'`);
    res.json({ version, status: "live", method: "delete" });
  });

  api.post("/question_section", (req, res) => {
    //take posts from req and insert into posts table
    const {
      post_id,
      q_name,
      options,
      q_answer,
      has_option,
      q_comment,
      status,
      created_by,
      updated_by,
      updated_time,
      timer
    } = req.body;
    console.log(req.body, "Body");

    const q_uuid = require("uuid/v1");
    //console.log(q_uuid(), "post");
    const created_time = new Date().getTime();
    console.log(created_time);
   // console.log(options, "sjkgcy");
    // const options='{-128 to 126,-128 to 127,-132 to 121,-121 to 111}';
    // const answer="egewg";
    //   console.log(answer);
    db.query(
      `insert into question_section values('${q_uuid()}','${post_id}','${q_name}','${options}','${q_answer}',${has_option},'${q_comment}',true,'${created_by}','${created_time}', null, null, '${timer}')`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ status: "successfull", response: response.rows });
        }
      }
    );
  });
  api.get("/question_section", (req, res) => {
    //find post_id in posts table and return the company
    db.query(
      "SELECT * from question_section  where status=true ",
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ posts: response.rows });
        }
      }
    );
  });
    api.get("/question_sections", (req, res) => {
    //find post_id in posts table and return the company
const {post_id}=req.query;
      // console.log(post_id,"req");
    db.query(`SELECT q_uuid,q_name,options,timer from  question_section where status=true AND post_id='${post_id}'`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ questions: response.rows });
        }
      }
    );
  });
  // api.get("/question_sectionTimer", (req, res) => {
  //   //find post_id in posts table and return the company
  //   db.query(
  //     `SELECT SUM(timer) from question_section where status=true AND post_id='JAVA12'`,
  //     (err, response) => {
  //       if (err) {
  //         console.log(err.stack);
  //       } else {
  //         console.log(response.rows);
  //         res.json({ questions_time: response.rows });
  //       }
  //     }
  //   );
  // });
  api.get("/question_section/:q_uuid", (req, res) => {
    //find post_id in posts table and return the company
    console.log(req.params.q_uuid, "uuid");
    db.query(
      `SELECT * from question_section where q_uuid='${req.params.q_uuid}'`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ question: response.rows });
        }
      }
    );
  });
  api.put("/question_section/:uuid", (req, res) => {
    console.log("req", req.params);
    console.log("body", req.body);
    //take posts post_id from path and find the id and update
    const {
      post_id,
      q_name,
      options,
      answer,
      has_option,
      comment,
      updated_by,
      timer
    } = req.body;
    const updated_time = new Date().getTime();
    db.query(
      `UPDATE question_section set q_name='${q_name}',options='${options}',answer='${answer}',has_option='${has_option}',comment='${comment}',updated_by='${updated_by}',updated_time='${updated_time}',timer=${timer} where uuid='${req.params.uuid}'`
    );
    res.json({ version, status: "live", method: "put" });
  });


  api.delete("/question_section/:uuid", (req, res) => {
    console.log("req", req.params);
    //take posts id from path and find the id and update flag
    db.query(
      `update question_section set status=false where uuid='${req.params.uuid}'`
    );
    res.json({ version, status: "live", method: "delete" });
  });

  api.post("/exam_rules", (req, res) => {
    //take posts from req and insert into posts table
    const {
      rule_name,
      priority,
      status,
      created_by,
      updated_by,
      updated_time
    } = req.body;
    const uuid = require("uuid/v1");
    console.log(uuid(), "post");
    const created_time = new Date().getTime();
    console.log(created_time);
    db.query(
      `insert into exam_rules values('${uuid()}','${rule_name}','${priority}',true,'${created_by}','${created_time}',null,null)`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ status: "successfull", response: response.rows });
        }
      }
    );
  });
  api.get("/exam_rules", (req, res) => {
    //find pouuiduuidst_id in posts table and return the company
    db.query(
      "SELECT * from exam_rules  where status=true ",
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ posts: response.rows });
        }
      }
    );
  });

  api.get("/exam_rules/:uuiduuid", (req, res) => {
    //find post_id in posts table and return the company
    console.log(req.params.uuiduuid, "uuiduuid");
    db.query(
      `SELECT * from exam_rules where uuiduuid='${req.params.uuiduuid}'`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ question: response.rows });
        }
      }
    );
  });
  api.put("/exam_rules/:uuid", (req, res) => {
    console.log("req", req.params);
    console.log("body", req.body);

    //take posts post_id from path and find the id and update
    const { rule_name, updated_by, priority } = req.body;
    const updated_time = new Date().getTime();
    db.query(
      `UPDATE exam_rules set rule_name='${rule_name}',priority='${priority}',updated_by='${updated_by}',updated_time='${updated_time}' where uuid='${req.params.uuid}'`
    );
    res.json({ version, status: "live", method: "put" });
  });
  api.delete("/exam_rules/:uuid", (req, res) => {
    console.log("req", req.params);
    //take posts id from path and find the id and update flag
    db.query(`update exam_rules set status=false where uuid='${req.params.uuid}'`);
    res.json({ version, status: "live", method: "delete" });
  });
  //user_capturing_answers





//user_post map crud
api.post("/candidate_post_map", (req, res) => {
  //take posts from req and insert into posts table
  const { post_id, status , created_by } = req.body;
  const uuid = require("uuid/v1");
  console.log(uuid(), "post");
  const user_id = require("uuid/v1");
  console.log(user_id());
  const created_time=new Date().getTime();
  db.query(
    `insert into candidate_post_map values('${uuid()}','${user_id()}','${post_id}',true,'${created_by}','${created_time}')`,
    (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
        res.json({ status: "successfull", response: response.rows });
      }
    }
  );
});
api.get("/candidate_post_map", (req, res) => {
  //find all in candidate_post_map table and return the candidate_post_map
  db.query("SELECT * from candidate_post_map", (err, response) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(response.rows);
      res.json({ posts: response.rows });
    }
  });
});
api.get("/candidate_post_map/:uuid", (req, res) => {
  //find all in candidate_post_map table and return the candidate_post_map
  db.query(`SELECT * from candidate_post_map where uuid='${req.params.uuid}'`, (err, response) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(response.rows);
      res.json({ posts: response.rows });
    }
  });
});
api.put("/candidate_post_map/:uuid", (req, res) => {
  console.log("req", req.params);
  console.log("body", req.body);

  //take candidate_post_map candidate_post_map_id from path and find the id and update
  const { post_id, updated_by } = req.body;
  const updated_time = new Date().getTime();
  db.query(
    `UPDATE candidate_post_map set  post_id='${post_id}',updated_by='${updated_by}',updated_time='${updated_time}' where uuid='${req.params.uuid}'`
  );
  res.json({ version, status: "live", method: "put" });
});
api.delete("/candidate_post_map/:id", (req, res) => {
  console.log("req", req.params);
  //take posts id from path and find the id and update flag
  db.query(`update candidate_post_map set status=false where id='${req.params.uuid}'`);
  res.json({ version, status: "live", method: "delete" });
});

api.post("/candidate_answer",(req, res) => {
  //take posts from req and insert into posts table
  // const { question_id, c_answer, c_comment } = req.body;
  const c_uuid = require("uuid/v1");
  console.log(c_uuid(), "post");
s
  const user_id="GWL12";
  console.log(user_id);
  var {answerList}=req.body;
  // answerList.forEach((item) =>
  // console.log(item,"i"),
  // db.MyCollection.save(item));
// answerList.forEach(a=>{
//   console.log(a.question_id,"q");
//   db.query(
//     `insert into candidate_answer values('${c_uuid()}','${user_id}','${a.question_id}','${a.c_answer}')`,
//     console.log(c_uuid(),a.question_id,a.c_answer,"ans"),
//     (err, response) => {
//       if (err) {
//         console.log(err.stack);
//       } else {
//         console.log(response.rows,"res");
//          res.json({ status: "successfull", response: response.rows });
//       }
//     }
//   )
// })
let rows='';
answerList.forEach(a=>{
if(rows.length!=0){
  rows+=',';
}
let uuid=c_uuid().substr(4)+rows.length;
rows+=`('${uuid}','${user_id}','${a.question_id}','${a.c_answer}')`

})

console.log(rows);
db.query(
`insert into candidate_answer values ${rows}`,
(err, response) => {
  if (err) {
    res.json({ status: "Failure", response: {err} });
  } else {
     res.json({ status: "successfull", response: response.rows });
  }
}
);

});
api.get("/user_candidate_answer", (req, res) => {
  //find all in candidate_post_map table and return the candidate_post_map
  db.query(`SELECT c_uuid,user_id,question_id,c_answer from candidate_answer`, (err, response) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(response.rows);
      res.json({ user_ans: response.rows });
    }
  });
});

api.get("/candidate_answer", (req, res) => {
    //store user_id
    let candidate = [];
    let candidate_id = [];
    //store user details
    let candidate_detail = [];
    //joining post, question_section and candidate_answer table, to fetch user actions
    db.query(`SELECT uuid, threshold, post_id,q_uuid,q_answer,q_comment,user_id,question_id,c_answer,c_comment from post p inner join question_section q on p.uuid=q.post_id inner join candidate_answer c on q.q_uuid=c.question_id `, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        //  console.log(response.rows);
        response.rows.map((user, index) => {
          // console.log(user.user_id,"user_id")
          //storing user_id each time, user attending any question
          return candidate.push(user.user_id);
        });
        // console.log(candidate,"sdfff")
        //storing unique user_id
        candidate_id = [...new Set(candidate.map(x => x))]
        // console.log(candidate_id,"sdfff")
        //calculating user marks and threshold value
        candidate_id.map((user, index) => {
          let obj = {}
          let marks = 0;
          let threshold;
          response.rows.forEach(element => {
            // console.log("element", element);
            threshold = element.threshold;
            if (user === element.user_id) {
              console.log("user answer:",element.c_answer);
              console.log("correct answer:",element.q_answer);
              // console.log(typeof(element.c_answer),"yyyy");
              // console.log(typeof(element.q_answer),"yyyy");
              if (element.q_answer == element.c_answer) {
                marks = marks + 10;
                console.log("yes", element.user_id)
                // console.log("  ")
              }
            }
          });
          obj.marks = marks;
          obj.user = user;
          if (marks >= threshold) {
            obj.result = "pass"
          }
          else {
            obj.result = "fail"
          }
          return candidate_detail.push(obj);
        })
        res.json({ "Candidate Result": candidate_detail });
      }
    });
  });
api.put("/candidate_answer", (req, res) => {

      console.log("body", req.body);
      const {c_answer,question_id}=req.body;

      db.query(`update candidate_answer set c_answer='${c_answer}' where question_id='${question_id}'`, (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
                   res.json({"status":"successfull"});
        }
      });
    });
  return api;
};
