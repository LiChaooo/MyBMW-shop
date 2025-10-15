#!/bin/bash

ip_node1="172.16.58.46"
ip_node2="172.16.58.47"


node_count=2

username_node1="root"
password_node1="q1w2e3r4"
remoteip_node1="36.129.30.215"

username_node2="www"
password_node2="1qaz2wsx."
remoteip_node2="36.129.30.214"


# Setup Logging
echo "Setup Logging Start..." >setup.log
echo "Error Logging Start..." >error.log


# Build Preaparation Shell
cat >preparation.sh <<EOF1
#!/bin/bash

######################################
#                                    #
#    MyBMW shop Deploy Preparation   #
#                                    #
######################################



# Install NPM
echo "Installing NPM..."
apt update >>setup.log 2>>error.log && apt-get update >>setup.log 2>>error.log
apt-get install -y nodejs npm >>setup.log 2>>error.log


# Start Service
git clone https://username:password@hostname/path/to/repository.git
npm install
npm run serve

EOF1



###################################
#                                 #
#   Start Preparation for Nodes   #
#                                 #
###################################


# Install sshpass
echo "Installing sshpass..."
apt install sshpass >>setup.log 2>>error.log


# Setup Service
echo "Setting up Nodes..."
for ((i=1; i<=$node_count; i++)) do
echo "Setting up for Node$i..."
username=$(eval echo \$username_node$i)
password=$(eval echo \$password_node$i)
remoteip=$(eval echo \$remoteip_node$i)
sshpass -p $password scp -o StrictHostKeyChecking=no preparation.sh $username@$remoteip:~/preparation.sh >>setup.log 2>>error.log
sshpass -p $password ssh -o StrictHostKeyChecking=no $username@$remoteip >>setup.log 2>>error.log <<bash
echo "Setup Logging Start..." >setup.log
echo "Error Logging Start..." >error.log
chmod a+x preparation.sh
./preparation.sh
rm -f preparation.sh
bash
sshpass -p $password scp -o StrictHostKeyChecking=no $username@$remoteip:~/setup.log node${i}_setup.log >>setup.log 2>>error.log
sshpass -p $password scp -o StrictHostKeyChecking=no $username@$remoteip:~/error.log node${i}_error.log >>setup.log 2>>error.log
done
rm -f preparation.sh
