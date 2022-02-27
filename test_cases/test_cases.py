from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
firefox_driver = webdriver.Firefox()


driver.get("http://localhost:3000/")
firefox_driver.get("http://localhost:3000/")

w_wait = WebDriverWait(driver, 10)
w_wait_firefox = WebDriverWait(firefox_driver, 10)

action = ActionChains(driver)
action_firefox = ActionChains(firefox_driver)

def case_1_1():
    """
    Check for invalid email and password
    :return: None
    """
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))

    incoming_message = driver.find_element_by_id("error_message").text

    assert incoming_message.startswith("Missing")
    print("Test successful")


def case_1_2():
    """
    Check for valid email/phone, invalid password
    :return: None
    """
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("test1@test.com")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))

    incoming_message = driver.find_element_by_id("error_message").text

    assert incoming_message.startswith("Parola")
    print("Test successful")


def case_1_3():
    """
    Check for invalid email/phone and valid password.
    :return: None
    """
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("test_1")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))

    incoming_message = driver.find_element_by_id("error_message").text

    assert incoming_message.startswith("Missing")
    print("Test successful")


def case2():
    """
    Check if the application runs in other browsers such as Firefox as well as Chrome.
    :return: None
    """
    email_phone_text_field = firefox_driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("test1@test.com")

    password_text_field = firefox_driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("test_1")

    login_button = firefox_driver.find_element_by_id("login_button")
    login_button.click()

    w_wait_firefox.until(ec.presence_of_element_located((By.ID, "error_message")))

    incoming_message = firefox_driver.find_element_by_id("error_message").text

    assert incoming_message.startswith("Successful")
    print("Test successful")


def case3_1():
    """
    Checking for the phone number login without +90
    :return: None
    """
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("01231231245")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("test_1")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    incoming_message = driver.find_element_by_id("error_message").text

    assert incoming_message.startswith("Successful")
    print("Test 3 -- Phone number without +90 -- successful.")



def case3_2():
    """
    Checking for the phone number login with +90
    :return: None
    """
    email_phone_text_field2 = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field2.send_keys("+901231231245")

    password_text_field2 = driver.find_element_by_id("password_text_field")
    password_text_field2.send_keys("test_1")

    login_button2 = driver.find_element_by_id("login_button")
    login_button2.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    incoming_message = driver.find_element_by_id("error_message").text

    assert incoming_message.startswith("Successful")
    print("Test 3 -- Phone number starting with +90 -- successful.")

def case_4():
    """
    Checking for successful login.
    :return: None
    """
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("test1@test.com")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("test_1")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    incoming_message = driver.find_element_by_id("error_message").text

    assert incoming_message.startswith('Successful')
    print("test 4 successful")


def case_5():
    """
    Test case for trying to copy the content from the password field.
    :return: None
    """
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("test1@test.com")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("test_1")

    password_text_field.click()
    webdriver.ActionChains(driver).key_down(Keys.CONTROL).send_keys("c").perform()


    password_text_field.click()
    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("")


    print("PW TEXT FIELD", password_text_field.text)
    email_phone_text_field.click()

    webdriver.ActionChains(driver).key_down(Keys.CONTROL).send_keys("v").perform()

    assert email_phone_text_field.text == ''
    print("test 5 successful")


def initiate_test_cases():
    """
    Function that initiates all the test cases.
    Uncomment/Comment test cases for checking one by one.
    :return: None
    """
    print("Started test cases ---------------------------------------")
    case_1_1()
    #case_1_2()
    #case_1_3()
    #case2()
    #case3_1()
    #case3_2()
    #case_4()
    #case_5()
    print("Test cases finished successfully -------------------------")


# Run the test cases
initiate_test_cases()

# Quit the driver
driver.quit()

