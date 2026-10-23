import { useState } from 'react';

export default function AwardPhoto({ award }) {
  const [failedSources,setFailedSources] = useState([]);
  const source=[award.photoPath,award.fallbackImage].find(url=>url&&!failedSources.includes(url));
  return <div className="sp-award-photo">
    {source ? <img src={source} alt={award.title} onError={()=>setFailedSources(previous=>[...previous,source])}/> : <span className="sp-award-photo-placeholder" role="img" aria-label={`${award.title}: photo to be added`}/>}
  </div>;
}
