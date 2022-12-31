const getPremiumArtist = (limit, all) => {
    getAPI("http://localhost:8083/api/penyanyi/getListPenyanyi", (data) => {
      const jsonData = JSON.parse(data);
      console.log(jsonData.content);
      generatePremiumArtistDashboard(jsonData.content,limit,all);
    });
  };

getPremiumArtist(10, true);
  