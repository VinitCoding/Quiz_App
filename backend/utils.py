import base64

def image_to_base64(image_path):

    with open(image_path, "rb") as image_file:
        image_data = base64.b64encode(image_file.read()).decode()
    return image_data


def base64_to_image(base64_string, output_path):
    try:

        binary_data = base64.b64decode(base64_string.encode())

        with open(output_path, "wb") as output_file:
            output_file.write(binary_data)

        return True
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return False