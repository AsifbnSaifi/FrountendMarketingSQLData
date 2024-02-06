import { useState } from "react";
import axios from "axios";
import ParentDataChild from "./ParentDataChild";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
  });

  const [personData, setPersonData] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const responce = await axios.post("http://localhost:4000/datalogin", formData);
      setPersonData(responce.data);
      
      setFormData({
        name: "",
        client: "",
      });
    } catch (error) {
      console.warn(error);
    }
  };
  console.log(personData);
  // console.log(personData && personData[0] && personData[0].referalID)

  function convertToHierarchy(data, parentId = personData && personData[0] && personData[0].referalID) {
    const result = data?.filter((item) => item.referalID === parentId).map((item) => ({
      name: item.Name,
      attributes: {
        clientId: item.clientID,
        referralId: item.referalID,
      },
      children: convertToHierarchy(data, item.clientID),
    }));
  
    return result?.length > 0 ? result : null;
  }
  
  const hierarchicalData = convertToHierarchy(personData);
  console.log(hierarchicalData);

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 lg:ml-[25rem]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="client"
                className="block mb-2 text-sm font-medium "
              >
                ClientID
              </label>
              <input
                type="password"
                name="client"
                id="client"
                placeholder="ID"
                value={formData.client}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
             <ParentDataChild personData = {hierarchicalData} />
    </>
  );
};

export default Login;
