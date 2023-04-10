import React from 'react'

function FormulaireAjout() {
    const [lieu, setLieu] = React.useState('')
    const [addr, setAddr] = React.useState('')
    const [arron, setArron] = React.useState('')
    const [annee, setAnnee] = React.useState('2023')
    const [selectedType, setSelectedType] = React.useState('atelier')
    const [lon, setLon] = React.useState('')
    const [lat, setLat] = React.useState('')
    const [remarques, setRemarques] = React.useState('')

    function handleAnnuler() {
        setLieu('')
        setAddr('')
        setArron('')
        setSelectedType('atelier')
        setAnnee('2023')
        setLon('')
        setLat('')
        setRemarques('')
    }

    function handleEnvoyer() {
      console.log("TODO : Ajouter dans la BD (???)")
    }

    return (
    <>
        <label>Nom du lieu : </label ><input type="text" value={lieu} onChange={e => setLieu(e.target.value)}/><br/>
        <label>Adresse : </label ><input type="text" value={addr} onChange={e => setAddr(e.target.value)}/><br/>
        <label>Arrondissement : </label ><input type="text" value={arron} onChange={e => setArron(e.target.value)}/><br/>
        <label>Type : <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
            <option value='atelier'>Atelier de réparation de vélos</option>
            <option value='fontaine'>Fontaine à boire</option>
        </select></label ><br/>
        <label>Année d'établissement : <select value={annee} onChange={e => setAnnee(e.target.value)}>
            <option value='2019'>2019</option>
            <option value='2020'>2020</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
        </select></label><br/>
        {selectedType == 'fontaine' && (
            <><label>Coordonnées géographiques : </label><button>Map (???)</button> 
              <label> ou Longitude : </label><input type="text" value={lon} onChange={e => setLon(e.target.value)}/> 
              <label> Latitude : </label><input type="text" value={lat} onChange={e => setLat(e.target.value)}/>
            <br/></>
        )}
        <label>Remarques : </label ><input type="text" value={remarques} onChange={e => setRemarques(e.target.value)}/><br/>
        <button type="button" onClick={() => handleAnnuler()}>Annuler</button>
        <button type="button" onClick={() => handleEnvoyer()}>Envoyer</button>
    </>
  )
}

export default FormulaireAjout