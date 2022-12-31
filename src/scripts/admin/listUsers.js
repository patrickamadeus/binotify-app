const listUsersCallback = (data) => {
    console.log(data);
    const result = JSON.parse(data);

    if (result.status == "success"){
        console.log("berhasil menampilkan user");
        document.getElementById("user_detail__container").innerHTML = result.html;
    } else {
        console.log("gagal meanmpilkan user");
        console.log(result.description)
    }

}

const listUsers = () => {
    getAPI(`php/admin/listUsers.php`, listUsersCallback);

    return;
}

listUsers();