const searchButton = document.getElementById('search');
const inputSearch = document.querySelector('.input-search');

searchButton.addEventListener('focus', function() {
  this.style.transform = 'scale(0.66)';
});

inputSearch.addEventListener('focus', function() {
  searchButton.style.transform = 'scale(0.66)';
});

searchButton.addEventListener('blur', function() {
  this.style.transform = 'scale(1)';
});

inputSearch.addEventListener('blur', function() {
  searchButton.style.transform = 'scale(1)';
});

const content = document.querySelector('.profile');

searchButton.addEventListener('click', async function(e){
    let username = document.querySelector('.input-search').value;
    
    content.innerHTML = 
    `
        <div class="body">
            <center>
                <img src="./src/loading.svg" alt="">
            </center>
        </div>
    `

    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
    });

    try{
        let response = await fetch(`https://api.github.com/users/${username}`);
        let data = await response.json();


        if(data.message === 'Not Found'){
            content.innerHTML = `
            <div class="body">
                <div class="error">
                    <img src="./src/not-found.png" alt="">
                    <div>
                        <h2>NOT FOUND</h2>
                        <p>Please check if you entered the correct username or try a different one.</p>
                    </div>
                </div>
            </div>`
        }


        let response2 = await fetch(data.repos_url);
        let data2 = await response2.json();

        let tableList = ``;
        
        data2.forEach(e => {
            tableList+= 
        `
            <tr>
                <td>
                    <a href=${e.html_url} target="_blank">
                        ${e.name}
                    </a>
                </td>
                <td><img src='./img/fork.svg' width='20px'> ${e.forks} </td>
                <td><img src='./img/star.svg' width='20px'> ${e.watchers}</td>
            </tr>
        `
            
        });
        

        content.innerHTML = `
    <div class="body">

    <div class="main">
        <h2>${data.type} INFO</h2>
        <div class="card">
            <div class="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>:</td>
                            <td><a href=${data.html_url} target="_blank" class="active">${username}</a></td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>${data.name}</td>
                        </tr>
                        <tr>
                            <td>Followers</td>
                            <td>:</td>
                            <td>${data.followers}</td>
                        </tr>
                        <tr>
                            <td>Created at</td>
                            <td>:</td>
                            <td>${data.created_at.split("T")[0]} (${data.created_at.split("T")[1].split("Z")[0]})</td>
                        </tr>
                        <tr>
                            <td>Updated at</td>
                            <td>:</td>
                            <td>${data.updated_at.split("T")[0]} (${data.updated_at.split("T")[1].split("Z")[0]})</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <h2>REPOS (Total : ${data.public_repos})</h2>
        <div class="card">
            <div class="list">
                <table>
                    ${tableList}
                </table>
            </div>
        </div>
    </div>
        </div>
    `


    }
    catch(e){
        console.error(e.message);
    }

});