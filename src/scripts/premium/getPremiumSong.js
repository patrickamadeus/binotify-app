const getPremiumSong = (limit, all) => {
    const penyanyi_id = new URLSearchParams(window.location.search).get("creator_id")

    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        const user_id = JSON.parse(this.responseText).user_id;
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            const creatorData = JSON.parse(this.responseText).content;
            document.getElementById("header__title_detail").textContent = creatorData.name;
        };
        xhr.open("GET", `http://localhost:8083/api/penyanyi/getDetailPenyanyiById?penyanyi_id=${penyanyi_id}`);
        xhr.send();

        getAPI(`http://localhost:8083/api/penyanyi/getListLaguPenyanyi?user_id=${user_id}&penyanyi_id=${penyanyi_id}`, (data) => {
            const jsonData = JSON.parse(data);
            console.log(jsonData);

            if (jsonData.status === 401){
                window.location = "premium_artist.html";
            }else{
                generatePremiumSongDashboard(jsonData.content,limit,all);
            }
        });
    };
    xhr.open("GET", 'php/getsession.php');
    xhr.send()
};

getPremiumSong(10, true);
  