# Apache JMeter - with Concurrency Thread Group plugin

This is not meant to be run in automation, it should only be used locally, as to not Ddos any online servers.

You need to install Java on your pc, then download the binaries  (apache-jmeter-x.x.x.zip)
https://jmeter.apache.org/download_jmeter.cgi

when you download it an unzip it, and go to "bin/" and look for jmeter.bat or jmeter.sh (bat is a windows run file).

then you need to install this plugin
https://jmeter-plugins.org/wiki/ConcurrencyThreadGroup/ 

follow the guide on that website.

After everything is up and running, import the "stress test.jmx"

remember to enable the single one you want to run and disasble the rest (if more than one is enable, they all run at the same time).