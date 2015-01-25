
#!bin/bash
curl -u 'YOUR_GITHUB_USER_NAME' https://api.github.com/user/repos -d "{\"name\":\"$1\"}";
mkdir ~/$1;
cd ~/$1;
git init;
touch README.md;
git add README.md;
git commit -m "first commit";
git remote add origin git@github.com:YOUR_GITHUB_USER_NAME/$1.git;
git push origin master;

# N.B. Here $1 is the repository name that is passed as an argument when invoking the script Change YOUR_GITHUB_USER_NAME before saving the script.

# Set required permissions to the script file 
# chmod 755 githubscript.sh

# Include the scripts directory in the environment configuration file. 
# nano ~/.profile;
# export PATH="$PATH:$HOME/Desktop/my_scripts"

# Also set an alias to run the githubscript.sh file. 
# nano ~/.bashrc;
# alias githubrepo="bash githubscript.sh"

# Now reload the .bashrc and .profile files in the terminal. 
# source ~/.bashrc ~/.profile;

# Now to create a new repository i.e. demo: 
# githubrepo demo;

