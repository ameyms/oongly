#Oongly
_(n)_ A finger, in [Hindi language](http://en.wikipedia.org/wiki/Hindi)  
_(n)_ A nodejs based tool for uploading/downloading files and executing remote commands in non-homogeneous systems  
 ---

###On Remote Server  

 		oonglyd --port 8080

---    
    

###On local machine   
####Upload files
 		oonglycli --host foo.local --port 8080 --op upload --file /home/ameyms/foo.sh --remotepath /var/fubar/bar.sh
   
    


####Download files
 		oonglycli --host foo.local --port 8080 --op download --file /home/ameyms/foo.sh --remotepath /var/fubar/bar.sh
   
    

####Execute remote command
 		oonglycli --host foo.local --port 8080 --op cmd cat /home/amey/code/*.js foo | wc -l
   
    
   
   


 ---

   
   
[Oongly Github Page ](http://ameyms.github.com/oongly/)