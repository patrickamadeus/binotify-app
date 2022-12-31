/**
 * Generate dashboard item for dashboard page
 * @param {Array.<{user_id:number, email:string, password:string, username:string, name:string, isAdmin:boolean}>} artistArray 
 * Array of listed artist(s)
 */
// import getUserId from './userIdHandler.js';
const subscribeHandler = (creator_id) => {
  console.log(creator_id);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      let user_id = JSON.parse(this.responseText).user_id;

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (this.readyState !== 4) return;
          const res = JSON.parse(this.responseText).value
          console.log(res);
          window.location.reload();
      };
      xhr.open("POST", "http://localhost:8083/api/subscription/createSubscriptionSoap");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({ "subscriber_id" : user_id, "creator_id" : creator_id }));
  }
  xhr.open("GET", 'php/getsession.php');
  xhr.send()
}
 

const generateButton = (creator_id, status) => {
  if (status == "PENDING") {
    return `<div class="theButton" id="pendingButton">PENDING</div>`;
  }
  else if (status == "APPROVED") {
    return `<div class="theButton" id="approvedButton"><a href="detail_premium.html?creator_id=${creator_id}">OPEN PAGE</a></div>`;
  }
  else if (status == "REJECTED") {
    return `<div class="theButton" id="rejectedButton" onclick="subscribeHandler(${creator_id})">SUBSCRIBE</div>`;
  }
}

 const generatePremiumArtistDashboard = (artistArray, limit, all) => {
    console.log("masukkk")
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        let user_id = JSON.parse(this.responseText).user_id;
        console.log(user_id)

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          console.log(this.readyState)
            if (this.readyState !== 4) return;
            const res = JSON.parse(this.responseText).value

            const approved = new Set();
            const pending = new Set();
    
            for(const item of res) {
              if (item.status == "APPROVED") { approved.add(item.creator_id); }
              else if (item.status == "PENDING") { pending.add(item.creator_id); }
            }
    
            let count = artistArray.length < limit ? artistArray.length : limit;
        
            let items = "";
            for (let i = 0; i < count; i++) {
              let button = ""
              if (approved.has(parseInt(artistArray[i].user_id))) { button = generateButton(artistArray[i].user_id, "APPROVED");}
              else if (pending.has(parseInt(artistArray[i].user_id))) { button = generateButton(artistArray[i].user_id, "PENDING"); console.log("mskk")} 
              else{ button = generateButton(artistArray[i].user_id, "REJECTED");}
        
              const text = `
              <div class="artist_list__line">
                <div class="artist_list__number">${i+1}</div>
                <div class="artist_list__name">${artistArray[i].name}</div>
                <div class="artist_list__buttons">
                    ${button}
                </div>
              </div>
              `
        
              items += text;
          }
            document.getElementById("dashboard__itemcontainer_artist").innerHTML = items;
        };
        xhr.open("POST", "http://localhost:8083/api/subscription/listSubscriptionSoap");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({ "subscriber_id" : user_id }));
    }
    xhr.open("GET", 'php/getsession.php');
    xhr.send()
};