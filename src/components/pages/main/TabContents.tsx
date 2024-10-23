import React from 'react'
import OptionsButton  from '@/components/elements/OptionsButton';

interface TabContentsProps {
  anchorId : string;
  scrollMarginTop : number;
  title : string;
  list : string[];
}

const TabContents = ({ anchorId, title, list, scrollMarginTop } : TabContentsProps) => {
  return (
    <div className='flex flex-col' id={anchorId} style={{ scrollMarginTop: `${scrollMarginTop}px` }}>
      <h1 className='mb-4'>{title}</h1>
      <div>
        {
          list.map((item, i) => (
            <OptionsButton
            key={i}
            label={item}
            ></OptionsButton>
          ))
        }
      </div>
    </div>
  )
}

export default TabContents