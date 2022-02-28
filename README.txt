Source codes for the implementation are found in the netflix-login directory.
Source codes for the test cases are found in the test_cases directory.

To run the project, one needs to go the netflix-login directory and then enter the following commands in this order:
npm install
npm start

Then, they should change directory to test_cases and then run the following command:
python -m pip install selenium

After this, one can run the automated test cases using this command:
python test_cases.py

Please remember that you need to have web driver for your browser added to path or in the test_cases directory in order to run the test cases.
By default, we use the ChromeDriver. If you use any other driver, you need to modify the source code.
You can choose which test cases to run/not run by commenting/uncommenting the relevant lines at test_cases.py.

Team Members:
Can Kırşallıoba - 21801768
Burak Yiğit Uslu - 21801745
Elif Kurtay - 21803373
Pelin Çeliksöz - 21600850	
