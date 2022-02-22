from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys

import time

driver = webdriver.Chrome()

driver.get("http://localhost:3000/")
w_wait = WebDriverWait(driver, 10)
action = ActionChains(driver)


# checking for valid/invalid inputs using regular input methods
def case_1_1():
    email_phone_text_field= driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
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

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
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

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
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

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    fail_message = "Bu e‑posta adresi ile bağlantılı bir hesap bulamadık. Lütfen yeniden deneyin ya da yeni bir hesap oluşturun."
    success_message = "Login Successful."

    incoming_message = driver.find_element_by_id("error_message").text

    assert fail_message.startswith("Bu") == incoming_message.startswith("Bu")
    print("Test successful")

# checking for valid/invalid inputs using login with facebook
def case_2():
    # an existing user in the database
    db_mail = "wvlwnyqzhs_1645552457@tfbnw.net"
    db_phone = "+905000000001"

    login_with_facebook_button = driver.find_element_by_id("login_with_facebook")
    login_with_facebook_button.click()
    time.sleep(1)

    driver.switch_to_window(driver.window_handles[1])
    time.sleep(3)

    facebook_email_phone_text_field = driver.find_element_by_id("email")
    facebook_email_phone_text_field.send_keys("bvgjollkqi_1645555306@tfbnw.net")
    time.sleep(1)

    facebook_password_text_field = driver.find_element_by_id("pass")
    facebook_password_text_field.send_keys("qM0iRMMdXwu4GhhooPoj")
    time.sleep(1)

    login_button = driver.find_element_by_id("loginbutton")
    login_button.click()

    # check the database for the email of the fb user's email
    # if it exists, login
    # if not,

    fail_message = "Girilen Facebook kullanıcı kayıtlarda bulunamadı. Netflix email ve şifrenizle girmeyi tekrar deneyin."
    success_message = "Successful Login."

    if not (db_mail == facebook_email_phone_text_field.text or db_phone == facebook_email_phone_text_field.text):
        w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
        incoming_message = driver.find_element_by_id("error_message").text

        if incoming_message.startswith("Girilen") == fail_message.startswith("Girilen"):
            assert fail_message.startswith("Girilen") == incoming_message.startswith("Girilen")
            print("Test successful")

        if incoming_message.startswith("Successful") == success_message.startswith("Successful"):
            assert success_message.startswith("Successful") == incoming_message.startswith("Successful")
            # test failed



# checking for the email and phone inputs
def case_3():
    #an existing user in the database
    db_email1 = "mail@mail.com"
    db_phone1 = "+905000000001"
    user1 = (db_email1, db_phone1)

    db_email2 = "pelin@gmail.com"
    db_phone2 = "+9053001234567"
    user2 = (db_email2, db_phone2)

    db_email3 = "phone@mail.com"
    db_phone3 = "+905000000002"
    user3 = (db_email3, db_phone3)

    db_email4 = "test1@test.com"
    db_phone4 = "+901231231231"
    user4 = (db_email4, db_phone4)



    users = [user1, user2, user3, user4]

    success_message = "Successful Message."

    email_phone_text_field = driver.find_element_by_id("email_phone_text_field")
    email_phone_text_field.send_keys("01231231245")

    password_text_field = driver.find_element_by_id("password_text_field")
    password_text_field.send_keys("test_1")

    login_button = driver.find_element_by_id("login_button")
    login_button.click()


    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    incoming_message = driver.find_element_by_id("error_message").text


    assert incoming_message.startswith("Successful")
    print("Test 3 successful.")



'''
    if email_phone_text_field.get_attribute('value')[0] == "+":
        entered_phone = email_phone_text_field.text
    elif "@" not in email_phone_text_field.text:
        entered_email = email_phone_text_field.text

    for t in users:
        if (t[1])[2:] == entered_phone or t[1] == entered_phone:
            wait.until(ec.presence_of_element_located((By.ID, "error_message")))
            incoming_message = driver.find_element_by_id("error_message").text

            assert success_message.startswith("Successful") == incoming_message.startswith("Successful")
            print("Test 3 successful.")

        else:
            print("user not found")
'''


# checking for the login operation after another succesful login operation
def case_4():
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




# checking for the copy operation from the password field
def case_5():

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

'''
    print("PW TEXT FIELD", password_text_field.text)
    login_button = driver.find_element_by_id("login_button")
    login_button.click()

    w_wait.until(ec.presence_of_element_located((By.ID, "error_message")))
    incoming_message = driver.find_element_by_id("error_message").text

    success_message = "Successful Login."

    print(incoming_message)
    assert incoming_message.startswith("Successful")
    print("Test 5 successful.")

'''



#case_1_1()

#case_2()

case_3()

#case_4()

#case_5()

driver.quit()

