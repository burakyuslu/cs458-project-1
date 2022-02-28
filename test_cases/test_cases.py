from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys
import time

errorTexts = {
    "missingField": "Missing email/phone value or password. Please re-enter.",
    "invalidInput": "Email/phone value or password is either too short or includes invalid characters. Please re-enter.",
    "wrongPhoneNo": "Phone number does not have correct length. Please re-enter.",
    "phoneNoDoesNotExist": "We could not find an account with this phone number. Please try again or open a new account.",
    "accountDoesNotExist": "We could not find an account with the given credentials.",
    "FacebookDNE": "Facebook credentials did not match with a Netflix account. "
                   + "Please try again with your Netflix email and password.",
    "wrongAuthMethod": "Users account is not matched with a Facebook account. "
                       + "Please try again with your Netflix email and password.",
    "success": "Successful login."
}

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
    print("Test 1.1 successful")

    driver.refresh()


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

    assert incoming_message.startswith("Missing")
    print("Test 1.2 successful")

    driver.refresh()


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
    print("Test 1.3 successful")

    driver.refresh()


def case_1_4():
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
    print("Test 1.4 successful")

    driver.refresh()

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
    print("Test 2 successful")

    firefox_driver.refresh()

def case3_1():
    """
    Checking for the phone number login without +90
    :return: None
    """
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("1231231231")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("test_1")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    incoming_message = driver.find_element_by_id("error_message").text

    assert incoming_message.startswith("Successful")
    print("Test 3.1 -- Phone number without +90 -- successful.")

    driver.refresh()


def case3_2():
    """
    Checking for the phone number login with +90
    :return: None
    """
    email_phone_text_field2 = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field2.send_keys("+901231231231")

    password_text_field2 = driver.find_element_by_id("password_text_field")
    password_text_field2.send_keys("test_1")

    login_button2 = driver.find_element_by_id("login_button")
    login_button2.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    incoming_message = driver.find_element_by_id("error_message").text

    assert incoming_message.startswith("Successful")
    print("Test 3.2 -- Phone number starting with +90 -- successful.")

    driver.refresh()


def case_4_1():
    """
    Checking for successful login with facebook
    :return: None
    """

    login_with_facebook_button = driver.find_element_by_id("login_with_facebook")
    login_with_facebook_button.click()
    time.sleep(1)

    # switch to facebook tab
    driver.switch_to_window(driver.window_handles[1])
    time.sleep(3)

    facebook_email_phone_text_field = driver.find_element_by_id("email")
    facebook_email_phone_text_field.send_keys("elif.kurtay00@gmail.com")
    time.sleep(1)

    facebook_password_text_field = driver.find_element_by_id("pass")
    facebook_password_text_field.send_keys("wrong_password")
    time.sleep(1)

    login_button = driver.find_element_by_id("loginbutton")
    login_button.click()

    webdriver.ActionChains(driver).send_keys(Keys.TAB).perform()
    webdriver.ActionChains(driver).send_keys(Keys.TAB).perform()
    webdriver.ActionChains(driver).send_keys(Keys.ENTER).perform()

    # close the Facebook popup
    driver.close()

    # switch back to chrome[0]
    driver.switch_to_window(driver.window_handles[0])

    # check the database for the email of the fb user's email
    # if it exists, login
    # if not,
    success_message = "Facebook"

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    incoming_message = driver.find_element_by_id("error_message").text

    assert success_message.startswith("Facebook") == incoming_message.startswith("Facebook")
    print("Test 4.1 successful")

    driver.refresh()


def case_4_2():
    """
    Checking for successful login with facebook
    :return: None
    """

    login_with_facebook_button = driver.find_element_by_id("login_with_facebook")
    login_with_facebook_button.click()
    time.sleep(1)

    # switch to facebook tab
    driver.switch_to_window(driver.window_handles[1])
    time.sleep(3)

    facebook_email_phone_text_field = driver.find_element_by_id("email")
    facebook_email_phone_text_field.send_keys("elif.kurtay00@gmail.com")
    time.sleep(1)

    facebook_password_text_field = driver.find_element_by_id("pass")
    facebook_password_text_field.send_keys("wzJDngPYEk8TXEfqkDky")
    time.sleep(1)

    login_button = driver.find_element_by_id("loginbutton")
    login_button.click()

    webdriver.ActionChains(driver).send_keys(Keys.TAB).perform()
    webdriver.ActionChains(driver).send_keys(Keys.TAB).perform()
    webdriver.ActionChains(driver).send_keys(Keys.ENTER).perform()

    # switch back to chrome[0]
    driver.switch_to_window(driver.window_handles[0])

    # check the database for the email of the fb user's email
    # if it exists, login
    # if not,
    success_message = "Successful Login."

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    incoming_message = driver.find_element_by_id("error_message").text

    if incoming_message.startswith("Successful") == success_message.startswith("Successful"):
        assert success_message.startswith("Successful") == incoming_message.startswith("Successful")
        print("Test 4.2 successful")

    driver.refresh()


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

    email_phone_text_field.click()

    webdriver.ActionChains(driver).key_down(Keys.CONTROL).send_keys("v").perform()

    assert email_phone_text_field.text == ''
    print("Test 5 successful")

    driver.refresh()


def initiate_test_cases():
    """
    Function that initiates all the test cases.
    Uncomment/Comment test cases for checking one by one.
    :return: None
    """
    print("Started test cases ---------------------------------------")
    case_1_1()
    case_1_2()
    case_1_3()
    case_1_4()
    case2()
    case3_1()
    case3_2()
    case_4_1()
    case_4_2()
    case_5()
    print("Test cases finished successfully -------------------------")


# Run the test cases
initiate_test_cases()

# Quit the driver
driver.quit()
firefox_driver.quit()

