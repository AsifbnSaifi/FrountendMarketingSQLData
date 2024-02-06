import axios from "axios";
import { useState } from "react";
import Tree from "react-d3-tree";

const Showdata = () => {
  const [personData, setPersonData] = useState();

  const getdata = async () => {
       try {
        const responce = await axios.get("http://localhost:4000/data");
        setPersonData(responce.data);
       } catch (error) {
          console.log(error)
       }
   
  };
  console.log(personData);

  function convertToHierarchy(data, parentId = 0) {
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
      <div className="text-center">
        <h1 className="text-4xl mb-3"> Show Data in Tree Format</h1>
        <button
          onClick={getdata}
          className="bg-red-600 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
        >
          <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          Show
        </button>
        {hierarchicalData && (
          <div className="w-[100%] h-[30rem]">
            <Tree
              data={hierarchicalData}
              orientation="vertical"
              translate={{ x: 600, y: 20 }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Showdata;
