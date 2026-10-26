import React from 'react';
import { workAssets as W } from './pageAssets';
import { diagramPlacements } from './diagramData';

const notes = [
  { className: 'notes-prarabdh', items: ['Tithigram Calendar Programs', 'Shunyagram Zero Day Programmes'] },
  { className: 'notes-pratibimb', items: ['Vidya Daan', 'Organ Donation', 'Toy Bank', 'Business Conclave'] },
  { className: 'notes-pravah-left', items: ['Dil Ka Jigsaw', 'Parinay Path', 'Jain Parivarik Adalat', 'Chapter Capacity Building'] },
  { className: 'notes-pravah-right', items: ['Smart Girl', 'Manthan', 'Plastic Surgery', 'BJS Saksham'] },
  { className: 'notes-parikalpana', items: ['Wagholi Education Rehabilitation Centre', 'Disaster Response', 'Blue Roots'] },
  { className: 'notes-prabodhi', items: ['Chapter Capacity Building'] },
];
const iconLayers = new Set(['imgGroup','imgGroup1','imgGroup2','imgGroup3','imgGroup4','imgGroup5','imgGroup6','imgGroup11','imgGroup12','imgGroup13','imgGroup14']);

export default function BasketDiagram() {
  return <div className="basket-diagram" role="img" aria-label="Program Basket: Prarabdh foundation, Pratibimb inception, Pravah infusion, Parikalpana national and Prabodhi elevation programs">
    <div className="diagram-canvas">
      {diagramPlacements.filter(p => !iconLayers.has(p.asset)).map(p => <div className={`diagram-layer${p.asset.startsWith('imgGroup')?' diagram-arrow':''}`} data-asset={p.asset} key={p.asset} style={{inset:p.inset}}><img src={W[p.asset]} alt=""/></div>)}
      <strong className="basket-center">PROGRAM<br/>BASKET</strong>
      <div className="basket-label label-foundation"><span>Foundation<br/>Programs</span><strong>Prarabdh</strong></div>
      <div className="basket-label label-inception"><span>Inception<br/>Programs</span><strong>Pratibimb</strong></div>
      <div className="basket-label label-infusion"><span>Infusion<br/>Programs</span><strong>Pravah</strong></div>
      <div className="basket-label label-national"><span>National<br/>Programs</span><strong>Parikalpana</strong></div>
      <div className="basket-label label-elevation"><span>Elevation<br/>Programs</span><strong>Prabodhi</strong></div>
      {notes.map(note => <ul className={`basket-notes ${note.className}`} key={note.className}>{note.items.map(item => <li key={item}>{item}</li>)}</ul>)}
    </div>
  </div>;
}
