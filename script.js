// BackgroundChanger
var button=document.querySelector("#backGroundChanger");
var Dark=true;
button.addEventListener('click',Change);
function Change(){
    document.body.classList.toggle ('backGroundChange');
    if(Dark)
    {
        DarkMode.textContent="Light";
      
        document.body.classList.add(
            'ClearColor',
            'DarkSearchMode',
            'DarkBarColor',
            'BarTextColor',
            'darkMode',
            'darkModeGithubDetails',
            'DarkMode'
        );

        Dark=false;

    }
    else{
        DarkMode.textContent="Dark";
       document.body.classList.remove(
    'ClearColor',
    'DarkSearchMode',
    'DarkBarColor',
    'BarTextColor',
    'darkMode',
    'darkModeGithubDetails',
    'DarkMode'
);
        Dark=true;
    }
   
   

        
}
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//Data Fetch 
var UserName=document.querySelector("#name");
var button = document.querySelector("#btw");
var CreatedOnDate=document.querySelector("#DateJoined")
button.addEventListener('click', UserData);
var UserProfile=document.querySelector("#username");
var Userbio=document.querySelector(".bioDetails");
var repo=document.querySelector("#repoDeatils");
var followers=document.querySelector("#followersDeatils");
var following=document.querySelector("#followingDetails");
var Locations=document.querySelector("#location")
var Redirect=document.querySelector("#RedirectToProfile");
var redirectToTwitter=document.querySelector("#UserTwiter");
var UserBlog=document.querySelector("#blogDetails");
var getUserImage=document.querySelector("#userImage");
var DarkMode=document.querySelector("#bkg");
var ClearButton=document.querySelector(".clear");
var inputsearch=document.querySelector("#bar");
inputsearch.addEventListener("keypress",function(even)
{
    if(even.key=="Enter")
    {
        UserData();
    }
});

async function UserData() {
    var searchedUser = document.querySelector("#bar").value;
    try {
        var response = await fetch(`https://api.github.com/users/${searchedUser}`);
        if (response.ok) {
            let data = await response.json();
            console.log("API Running");
            document.body.classList.add('cardDisplay');

            UserName.textContent=data.name;
            //Extracting Date 
            const d = new Date(data.created_at);
            const formattedDate = "Joined "+`${d.getDate()} ${months[d.getMonth()]}  ${d.getFullYear()}`;
            document.querySelector("#DateJoined").textContent = formattedDate;
              //Extracting Username//See At the end
              RedirectToProfile.textContent = "@" + data.login;

              // Set href attribute
              RedirectToProfile.href = "https://github.com/" + data.login;

            
             
                          if(data.bio===null)
            {
                Userbio.textContent="This User has no bio !";   
               
            }
            else
            {
                Userbio.textContent=data.bio;
            }
            //Repo,followers & Following
            repo.textContent=data.public_repos;
            followers.textContent=data.followers;
            following.textContent=data.following;
            //Locations
            if(data.location===null)
            {
                Locations.textContent="Not Available";
            }
            else
            {
                Locations.textContent=data.location;
            }
           
            if(data.twitter_username===null)
            {
                redirectToTwitter.textContent="Not Available";
            }
            else{
                redirectToTwitter.textContent=data.twitter_username;
                redirectToTwitter.href="https://twitter.com/"+data.twitter_username;
            }
            if (data.blog === null || data.blog === "") 
            {
                UserBlog.textContent="Not Available";
                console.log("Running")
            }
            else{
                UserBlog.textContent=data.blog;
              
            }
            //User Image
            getUserImage.src=data.avatar_url;
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        alert(error.message);
        document.querySelector("#bar").value="";
        


    }
}
//Clear Button
ClearButton.addEventListener('click', ClearData);
function ClearData(){
    try {
            document.querySelector("#bar").value="";
            document.body.classList.remove('cardDisplay');
        
    } catch (error) {
        alert("There is no Data !");
        
    }
}








