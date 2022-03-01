Source codes for the implementation are found in the netflix-login directory.
Source codes for the test cases are found in the test_cases directory.

To run the project, one needs to go the netflix-login directory and then enter the following commands in this order:
```npm install```
```npm start```

Then, they should change directory to test_cases and then run the following command:
```pip install selenium```
  OR
```python -m pip install selenium```

After this, one can run the automated test cases using this command:
```python test_cases.py```

To run these commands, you need to have npm and pip installed.

Please remember that you need to have web driver for your browser added to path or in the test_cases directory in order to run the test cases.
By default, we use the ChromeDriver and for test case 2 we used the gecko driver (webdriver for Firefox). If you use any other driver, you need to modify the source code.
You can run the test cases by running the python file (specifically the 'initiate_test_cases() function), all the test cases will work sequentially.

Team Members:
Can Kırşallıoba - 21801768
Burak Yiğit Uslu - 21801745
Elif Kurtay - 21803373
Pelin Çeliksöz - 21600850	
