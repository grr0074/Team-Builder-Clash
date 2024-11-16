# Team-Builder-Clash

#New format, this is another testing done by Lam.
In this section, I will try to create another version that I'm currently working with, which also using REACT, CSS, MYSQL, and NodeJS and so on. etc.
Provide some commands for u guys to build it for urself since I store data locally, we can switch to cloud space if we can disscuss about the price I would say xD
and also i use WSL on VSC

**#Lets start with install part.**

- First, install **NodeJS**\
    nodejs.org/en/download/current\
after install, we can check by using these command:
```
  node -v
```
- Check if install **npm** or not by using:
```
  npm -v
```
,if not, please install as:
```
  npm install -g npm
```

Install XAMPP as LOCAL DATABASE
------------------------------------------------------
```
https://www.apachefriends.org/
```
Press Start to run 2 server, Apache and MYSQL, for MYSQL, if anyone got problem with port connection. Let try to do this.
After open XAMPP Control Panel. on MySQL line, click config => my.ini. Change 2 lines "port=..." into the port you like, which must be free for connection


After that, file XAMPP folder, xampp/phpAdmin/config.inc.php file, add this line where X is the port change.

'''
$cfg['Servers'][$i]['port'] = 'X';
'''


After download the git, or clone.
-------------------------------------------------------------------------------------

in Server folder, run
'''
npm start
'''
in employeeMs, run
'''
npn run dev
'''

