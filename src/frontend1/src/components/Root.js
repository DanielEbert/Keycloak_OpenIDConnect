import React from 'react';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';


import { makeStyles } from '@material-ui/core/styles';


import { useKeycloak } from '@react-keycloak/web'


// example from https://material-ui.com/components/modal/
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Root = () => {
  const { keycloak } = useKeycloak()
  const [IDToken, updateIDToken] = React.useState(keycloak.idTokenParsed)
  const [accessToken, updateAccessToken] = React.useState(keycloak.tokenParsed)
  const [refreshToken, updateRefreshToken] = React.useState(keycloak.refreshTokenParsed)
  const [modalIsOpen, openModal] = React.useState(false)
  const [modalContent, changeModalContent] = React.useState({})

  const classes = useStyles();
 
  keycloak.onAuthRefreshSuccess = function() { 
    updateIDToken(keycloak.idTokenParsed)
    updateAccessToken(keycloak.tokenParsed)
    updateRefreshToken(keycloak.refreshTokenParsed)
  }

  const onOpenModal = () => {
    openModal(true);
  };

  const onCloseModal = () => {
    openModal(false);
  };

  const getServiceData = (url) => {
    axios.post(url, {
      'blablabla': 'aaaa'
    }, {
      headers: { Authorization: "Bearer " + keycloak.token }
    })
    .then(res => {
      console.log(res)
      changeModalContent({
        "data": res.data, 
        "return_code": res.status,
        "url": res.config.url
      }) 
      onOpenModal()
    })
    .catch(error => {
      console.log("Error posting to service 1")
      changeModalContent({
        "data": error.response.data, 
        "return_code": error.response.status,
        "url": error.response.config.url
      }) 
      onOpenModal()
    })
  }

  const x = () => {
    return <div style={{position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'}} 
                className={classes.paper}>
      <h5>Request to {modalContent["url"]}</h5>
      <div className="divider"></div>
      <p>Returned with Status Code {modalContent["return_code"]}</p> 
      <p>Service has authorized {modalContent["data"]}</p>
    </div>
  }

  return(
    <div className="Root container">
        <div className="container">
          <div className="row" style={{marginTop:'25px'}}>
            <h3 className="center">Request Resources</h3>
            <div className="divider"></div>
            <div className='center' style={{marginTop:'25px'}}>
              <button className="btn" style={{marginRight: '25px'}} onClick={() => 
                getServiceData('http://localhost:5001')}>Get Service 1 Data
              </button>
              <button className="btn" style={{marginRight: '25px'}} onClick={() => 
                getServiceData('http://localhost:5002')}>Get Service 2 Data
              </button>
              <Modal open={modalIsOpen} onClose={onCloseModal}>
                {x()}
              </Modal>
            </div>
          </div>
        </div>
        {keycloak.authenticated ? 
          <div className="container">
            <div className="row" style={{marginTop:'25px'}}>
            <h3 className="center" style={{marginTop:'50px'}}>Tokens</h3>
            <div className="divider" ></div>
            <Accordion style={{marginTop:'25px'}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h6>ID Token</h6>
              </AccordionSummary>
              <AccordionDetails>
                <pre>{JSON.stringify(IDToken, null, 2)}</pre>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{marginTop:'15px'}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h6>Access Token</h6>
              </AccordionSummary>
              <AccordionDetails>
                <pre>{JSON.stringify(accessToken, null, 2)}</pre>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{marginTop:'15px'}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h6>Refresh Token</h6>
              </AccordionSummary>
              <AccordionDetails>
                <pre>{JSON.stringify(refreshToken, null, 2)}</pre>
              </AccordionDetails>
            </Accordion>
            </div>
          </div>
          : ""}
    </div>
  )
}

export default Root;
