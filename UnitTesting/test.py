import unittest
import requests
import json
class TestRequestMethods(unittest.TestCase):

    def test_hello_world(self):
        response = requests.get("http://localhost:5000")
        self.assertEqual(int(response.status_code), 200)
        self.assertEqual(response.text, 'Welcome')

    def test_post_get_location(self):
        responsePost = requests.post("http://localhost:5000/location",json={'location':str([0,0])})
        self.assertEqual(int(responsePost.status_code), 200)
        responseGet = requests.get("http://localhost:5000/location")
        self.assertEqual(int(responseGet.status_code), 200)
        self.assertTrue('[0, 0]' in responseGet.text)

if __name__ == '__main__':
    unittest.main()
