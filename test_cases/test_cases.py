from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait


driver = webdriver.Chrome()

driver.get("http://localhost:3000/")
wait = WebDriverWait(driver, 10)


# checking for valid/invalid inputs using regular input methods
def case_1_1():
    email_phone_text_field= driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    fail_message = "Bu e‑posta adresi ile bağlantılı bir hesap bulamadık. Lütfen yeniden deneyin ya da yeni bir hesap oluşturun."
    success_message = "Login Successful."

    incoming_message = driver.find_element_by_id("error_message").text

    assert fail_message.startswith("Bu") == incoming_message.startswith("Bu")
    print("Test successful")



def case_1_2():
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    fail_message = "Bu e‑posta adresi ile bağlantılı bir hesap bulamadık. Lütfen yeniden deneyin ya da yeni bir hesap oluşturun."
    success_message = "Login Successful."

    incoming_message = driver.find_element_by_id("error_message").text

    assert fail_message.startswith("Bu") == incoming_message.startswith("Bu")
    print("Test successful")

def case_1_3():
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    fail_message = "Bu e‑posta adresi ile bağlantılı bir hesap bulamadık. Lütfen yeniden deneyin ya da yeni bir hesap oluşturun."
    success_message = "Login Successful."

    incoming_message = driver.find_element_by_id("error_message").text

    assert fail_message.startswith("Bu") == incoming_message.startswith("Bu")
    print("Test successful")

def case_1_4():
    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    fail_message = "Bu e‑posta adresi ile bağlantılı bir hesap bulamadık. Lütfen yeniden deneyin ya da yeni bir hesap oluşturun."
    success_message = "Login Successful."

    incoming_message = driver.find_element_by_id("error_message").text

    assert fail_message.startswith("Bu") == incoming_message.startswith("Bu")
    print("Test successful")

# checking for valid/invalid inputs using login with facebook
def case_2():
    pass

# checking for the email and phone inputs
def case_3():
    pass

# checking for the login operation after another succesful login operation
def case_4():
    pass

# verifying if a user should not be allowed to login with Facebook provider if their credentials are from email/password
# not allow same mail for different account
def case_5():
    pass




case_1_1()


driver.quit()

