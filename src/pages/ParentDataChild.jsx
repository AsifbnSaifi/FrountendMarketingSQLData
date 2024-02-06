import React from 'react'
import Tree from "react-d3-tree";

const ParentDataChild = ({personData}) => {
       
  return (
    <>
     {personData && (
          <div className="w-[100%] h-[30rem]">
            <Tree
              data={personData}
              orientation="vertical"
              translate={{ x: 600, y: 20 }}
            />
          </div>
        )}
    </>
  )
}

export default ParentDataChild