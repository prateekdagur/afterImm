import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { getDataAPI } from "../../utils/API";
import {
  addwhitelist1,
  addwhitelist2,
  addwhitelist3,
  addwhitelist4,
  addwhitelist5,
  addwhitelist6,
  addwhitelist7,
  addwhitelist8,
  addwhitelist9,
  addcsvfiletowhitelistone,
  addcsvfiletowhitelisttwo,
  addcsvfiletowhitelistthree,
  addcsvfiletowhitelistfour,
  addcsvfiletowhitelistfive,
  addcsvfiletowhitelistsix,
  addcsvfiletowhitelistseven,
  addcsvfiletowhitelisteight,
  addcsvfiletowhitelistnine,
  deletewhitelist
} from "../../redux/actions/whitelistAction"
import Papa from 'papaparse';

//add white list component.
const AddUserInWhiteList = () => {
  const dispatch = useDispatch();

  const [whl1, setWhl1] = useState();
  const [whl2, setWhl2] = useState();
  const [whl3, setWhl3] = useState();
  const [whl4, setWhl4] = useState();
  const [whl5, setWhl5] = useState();
  const [whl6, setWhl6] = useState();
  const [whl7, setWhl7] = useState();
  const [whl8, setWhl8] = useState();
  const [whl9, setWhl9] = useState();

  const [tieronefile, setTieronefile] = useState('');
  const [tiertwofile, setTiertwofile] = useState('');
  const [tierthreefile, setTierthreefile] = useState('');
  const [tierfourfile, setTierfourfile] = useState('');
  const [tierfivefile, setTierfivefile] = useState('');
  const [tiersixfile, setTiersixfile] = useState('');
  const [tiersevenfile, setTiersevenfile] = useState('');
  const [tiereightfile, setTiereightfile] = useState('');
  const [tierninefile, setTierninefile] = useState('');

  const [open, setOpen] = useState(false);
  const [opencsv, setOpenCsv] = useState(false);
  const [whitelistnumber, setwhitelistnumber] = useState('')
  const [csvNumber, setCsvNumber] = useState('')
  const [title, setTitle] = useState('')

  const {auth} = useSelector(state => state)
  const id = useParams().id;
  useEffect(() => {
    getDataAPI(`getPool/${id}`).then((res) => setTitle(res.data.title));
  }, [id]);

  const SubmitWhitelist1 = () => {
    dispatch(addwhitelist1(whl1, id, auth))
  };

  const SubmitWhitelist2 = () => {
    dispatch(addwhitelist2(whl2, id, auth))
  };

  const SubmitWhitelist3 = () => {
    dispatch(addwhitelist3(whl3, id, auth))
  };

  const SubmitWhitelist4 = () => {
    dispatch(addwhitelist4(whl4, id, auth))
  };

  const SubmitWhitelist5 = () => {
    dispatch(addwhitelist5(whl5, id, auth))
  };

  const SubmitWhitelist6 = () => {
    dispatch(addwhitelist6(whl6, id, auth))
  };

  const SubmitWhitelist7 = () => {
    dispatch(addwhitelist7(whl7, id, auth))
  };

  const SubmitWhitelist8 = () => {
    dispatch(addwhitelist8(whl8, id, auth))
  };

  const SubmitWhitelist9 = () => {
    dispatch(addwhitelist9(whl9, id, auth))
  };


  const handllewhitelistonecsv = () => {
    handleCloseCsv()
    if (tieronefile) {
      Papa.parse(tieronefile, {
        complete: function (results) {
          dispatch(addcsvfiletowhitelistone(results.data, id, auth))
        }
      }

      )

    }
    setTieronefile('');
  }

  const handllewhitelisttwocsv = () => {
    handleCloseCsv()
    if (tiertwofile) {
      Papa.parse(tiertwofile, {
        complete: function (results) {
          dispatch(addcsvfiletowhitelisttwo(results.data, id, auth))
        }
      }
      )
    }
    setTiertwofile('')
  };

  const handllewhitelistthreecsv = () => {
    handleCloseCsv()
    if (tierthreefile) {
      Papa.parse(tierthreefile, {
        complete: function (results) {
          dispatch(addcsvfiletowhitelistthree(results.data, id, auth))

        }
      }
      )
    }
    setTierthreefile('')

  };

  const handllewhitelistfourcsv = () => {
    handleCloseCsv()
    if (tierfourfile) {
      Papa.parse(tierfourfile, {
        complete: function (results) {
          dispatch(addcsvfiletowhitelistfour(results.data, id, auth))

        }
      }
      )
    }
    setTierfourfile('')
  };

  const handllewhitelistfivecsv = () => {
    handleCloseCsv()
    if (tierfivefile) {
      Papa.parse(tierfivefile, {
        complete: function (results) {
          dispatch(addcsvfiletowhitelistfive(results.data, id, auth))

        }
      }
      )
    }
    
    setTierfivefile('')
  };

  const handllewhitelistsixcsv = () => {
    handleCloseCsv()
    if (tiersixfile) {
      Papa.parse(tiersixfile, {
        complete: function (results) {
          dispatch(addcsvfiletowhitelistsix(results.data, id, auth))
        }
      }
      )
    }
    setTiersixfile('')
  };

  const handllewhitelistsevencsv = () => {
    handleCloseCsv()
    if (tiersevenfile) {
      Papa.parse(tiersevenfile, {
        complete: function (results) {
          dispatch(addcsvfiletowhitelistseven(results.data, id, auth))
        }
      }
      )
    }
    setTiersevenfile('')
  };

  const handllewhitelisteightcsv = () => {
    handleCloseCsv()
    if (tiereightfile) {
      Papa.parse(tiereightfile, {
        complete: function (results) {
          dispatch(addcsvfiletowhitelisteight(results.data, id, auth))

        }
      }
      )
    }
    setTiereightfile('')
  };

  const handllewhitelistninecsv = () => {
    handleCloseCsv()
    if (tierninefile) {
      Papa.parse(tierninefile, {
        complete: function (results) {
          dispatch(addcsvfiletowhitelistnine(results.data, id, auth))

        }
      }
      )
    }
    setTierninefile('')
  };


  const handleOpen = (x) => {
    setwhitelistnumber(x)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenCsv = (x) => {
    setCsvNumber(x);
    setOpenCsv(true);
  };

  const handleCloseCsv = () => {
    setOpenCsv(false)
  }

  const deletePool = () => {
    dispatch(deletewhitelist(whitelistnumber, id, auth))
    setOpen(false)

  }

  const body = (
    <div className="paper">
      <div className="paper-inner">
        <div className="paper-head">
          <h2 className="paper_h2" id="simple-modal-title">Confirm to delete</h2>
          <span onClick={handleClose}><i className="fa fa-times" aria-hidden="true"></i></span>
        </div>
        <br />
        <div className="delete-tier">
          <a className="paper_button" href="#confirm" onClick={deletePool}>
            Confirm
          </a>
          <a className="paper_button" href="#cancel" onClick={handleClose}>
            Cancel
          </a>
        </div>

      </div>
    </div>
  );
  const csvModal = (
    <div className="paper">
      <div className="paper-inner">
        <div className="paper-head">
          <h2 className="paper_h2" id="simple-modal-title">Confirm to upload csv</h2>
          <span onClick={handleCloseCsv}><i className="fa fa-times" aria-hidden="true"></i></span>
        </div>
        <br />
        <div className="delete-tier">
          <label>File</label>
          <div className="upload-area">
            <div className="outer-parea">
              {tieronefile ? <p>{tieronefile ? tieronefile.name : ""}</p> : ""}
              {tiertwofile ? <p>{tiertwofile ? tiertwofile.name : ""}</p> : ""}
              {tierthreefile ? <p>{tierthreefile ? tierthreefile.name : ""}</p> : ""}
              {tierfourfile ? <p>{tierfourfile ? tierfourfile.name : ""}</p> : ""}
              {tierfivefile ? <p>{tierfivefile ? tierfivefile.name : ""}</p> : ""}
              {tiersixfile ? <p>{tiersixfile ? tiersixfile.name : ""}</p> : ""}
              {tiersevenfile ? <p>{tiersevenfile ? tiersevenfile.name : ""}</p> : ""}
              {tiereightfile ? <p>{tiereightfile ? tiereightfile.name : ""}</p> : ""}
              {tierninefile ? <p>{tierninefile ? tierninefile.name : ""}</p> : ""}
            </div>
            {csvNumber === 1 ? <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setTieronefile(e.target.files[0])} /> : ""}
            {csvNumber === 2 ? <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setTiertwofile(e.target.files[0])} /> : ""}
            {csvNumber === 3 ? <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setTierthreefile(e.target.files[0])} /> : ""}
            {csvNumber === 4 ? <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setTierfourfile(e.target.files[0])} /> : ""}
            {csvNumber === 5 ? <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setTierfivefile(e.target.files[0])} /> : ""}
            {csvNumber === 6 ? <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setTiersixfile(e.target.files[0])} /> : ""}
            {csvNumber === 7 ? <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setTiersevenfile(e.target.files[0])} /> : ""}
            {csvNumber === 8 ? <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setTiereightfile(e.target.files[0])} /> : ""}
            {csvNumber === 9 ? <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setTierninefile(e.target.files[0])} /> : ""}

            <a className="upld-btn" href="#cancel" onClick={() => handleCloseCsv()}>
              Choose File
            </a>
          </div>
        </div>
        <div className="upload-cancel">
          {csvNumber === 1 ?
            <a className="paper_button" href="#cancel" onClick={() => handllewhitelistonecsv()}>
              Submit
            </a>
            : ""}
          {csvNumber === 2 ?
            <a className="paper_button" href="#cancel" onClick={() => handllewhitelisttwocsv()}>
              Submit
            </a>
            : ""}
          {csvNumber === 3 ?
            <a className="paper_button" href="#cancel" onClick={() => handllewhitelistthreecsv()}>
              Submit
            </a>
            : ""}
          {csvNumber === 4 ?
            <a className="paper_button" href="#cancel" onClick={() => handllewhitelistfourcsv()}>
              Submit
            </a>
            : ""}
          {csvNumber === 5 ?
            <a className="paper_button" href="#cancel" onClick={() => handllewhitelistfivecsv()}>
              Submit
            </a>
            : ""}
          {csvNumber === 6 ?
            <a className="paper_button" href="#cancel" onClick={() => handllewhitelistsixcsv()}>
              Submit
            </a>
            : ""}
          {csvNumber === 7 ?
            <a className="paper_button" href="#cancel" onClick={() => handllewhitelistsevencsv()}>
              Submit
            </a>
            : ""}
          {csvNumber === 8 ?
            <a className="paper_button" href="#cancel" onClick={() => handllewhitelisteightcsv()}>
              Submit
            </a>
            : ""}
          {csvNumber === 9 ?
            <a className="paper_button" href="#cancel" onClick={() => handllewhitelistninecsv()}>
              Submit
            </a>
            : ""}

        </div>

      </div>
    </div>
  );

  return (
    <div className="container_cust">
      <div className="right-panel-main wishlist-data">
        <h2>Add User In White List</h2>
        <div className="project-drop">
          <p>Project:</p>
          <span>{title ? title : ""}</span>
        </div>
        <div className="rightpanel-form">
          <div className="form-inner form-width list-outer">
            <div className="form-group">
              <h3>Tier 1 list</h3>
              <div className="form-btn" >
                <div className="tire-form">
                  <input
                    type="email"
                    className="input-form"
                    placeholder="Enter the address"
                    required
                    onChange={(e) => setWhl1(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => SubmitWhitelist1()}
                    className="yellow_btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="listthree-btn">
                  <label className="border-btn" onClick={() => handleOpenCsv(1)}>  Upload CSV file </label>
                  <Link to={`/admin/listwhitelist/one/${id}`} className="border-btn">
                    View tier list
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpen(1)}
                    className="bttndelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-inner form-width list-outer">
            <div className="form-group">
              <h3>Tier 2 list</h3>
              <div className="form-btn">
                <div className="tire-form">
                  <input
                    type="email"
                    className="input-form"
                    placeholder="Enter the address"
                    required
                    onChange={(e) => setWhl2(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => SubmitWhitelist2()}
                    className="yellow_btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="listthree-btn">
                  <label className="border-btn" onClick={() => handleOpenCsv(2)}> Upload CSV file
                  </label>
                  <Link to={`/admin/listwhitelist/two/${id}`} className="border-btn">
                    View tier list
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpen(2)}
                    className="bttndelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-inner form-width list-outer">
            <div className="form-group">
              <h3>Tier 3 list</h3>
              <div className="form-btn" >
                <div className="tire-form">
                  <input
                    type="email"
                    className="input-form"
                    placeholder="Enter the address"
                    required
                    onChange={(e) => setWhl3(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => SubmitWhitelist3()}
                    className="yellow_btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="listthree-btn">
                  <label className="border-btn" onClick={() => handleOpenCsv(3)}> Upload CSV file
                  </label>
                  <Link to={`/admin/listwhitelist/three/${id}`} className="border-btn">
                    View tier list
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpen(3)}
                    className="bttndelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-inner form-width list-outer">
            <div className="form-group">
              <h3>Tier 4 list</h3>
              <div className="form-btn" >
                <div className="tire-form">
                  <input
                    type="email"
                    className="input-form"
                    placeholder="Enter the address"
                    required
                    onChange={(e) => setWhl4(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => SubmitWhitelist4()}
                    className="yellow_btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="listthree-btn">
                  <label className="border-btn" onClick={() => handleOpenCsv(4)}>  Upload CSV file
                  </label>
                  <Link to={`/admin/listwhitelist/four/${id}`} className="border-btn">
                    View tier list
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpen(4)}
                    className="bttndelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-inner form-width list-outer">
            <div className="form-group">
              <div className="tier-head">
                <h3>Tier 5 list</h3>
              </div>
              <div className="form-btn" >
                <div className="tire-form">
                  <input
                    type="email"
                    className="input-form"
                    placeholder="Enter the address"
                    required
                    onChange={(e) => setWhl5(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => SubmitWhitelist5()}
                    className="yellow_btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="listthree-btn">
                  <label className="border-btn" onClick={() => handleOpenCsv(5)}>Upload CSV file
                  </label>
                  <Link to={`/admin/listwhitelist/five/${id}`} className="border-btn">
                    View tier list
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpen(5)}
                    className="bttndelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-inner form-width list-outer">
            <div className="form-group">
              <div className="tier-head">
                <h3>Tier 6 list</h3>
              </div>
              <div className="form-btn" >
                <div className="tire-form">
                  <input
                    type="email"
                    className="input-form"
                    placeholder="Enter the address"
                    required
                    onChange={(e) => setWhl6(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => SubmitWhitelist6()}
                    className="yellow_btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="listthree-btn">
                  <label className="border-btn" onClick={() => handleOpenCsv(6)}>Upload CSV file
                  </label>
                  <Link to={`/admin/listwhitelist/six/${id}`} className="border-btn">
                    View tier list
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpen(6)}
                    className="bttndelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-inner form-width list-outer">
            <div className="form-group">
              <h3>Tier 7 list</h3>
              <div className="form-btn" >
                <div className="tire-form">
                  <input
                    type="email"
                    className="input-form"
                    placeholder="Enter the address"
                    required
                    onChange={(e) => setWhl7(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => SubmitWhitelist7()}
                    className="yellow_btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="listthree-btn">
                  <label className="border-btn" onClick={() => handleOpenCsv(7)}> Upload CSV file
                  </label>
                  <Link to={`/admin/listwhitelist/seven/${id}`} className="border-btn">
                    View tier list
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpen(7)}
                    className="bttndelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-inner form-width list-outer" >
            <div className="form-group">
              <h3>Tier 8 list</h3>
              <div className="form-btn"  >
                <div className="tire-form">
                  <input
                    type="email"
                    className="input-form"
                    placeholder="Enter the address"
                    required
                    onChange={(e) => setWhl8(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => SubmitWhitelist8()}
                    className="yellow_btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="listthree-btn">
                  <label className="border-btn" onClick={() => handleOpenCsv(8)}> Upload CSV file
                  </label>
                  <Link to={`/admin/listwhitelist/eight/${id}`} className="border-btn">
                    View tier list
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpen(8)}
                    className="bttndelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-inner form-width list-outer">
            <div className="form-group">
              <h3>Tier 9 list</h3>
              <div className="form-btn" >
                <div className="tire-form">
                  <input
                    type="email"
                    className="input-form"
                    placeholder="Enter the address"
                    required
                    onChange={(e) => setWhl9(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => SubmitWhitelist9()}
                    className="yellow_btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="listthree-btn">
                  <label className="border-btn" onClick={() => handleOpenCsv(9)}>Upload CSV file
                  </label>
                  <Link to={`/admin/listwhitelist/nine/${id}`} className="border-btn">
                    View tier list
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpen(9)}
                    className="bttndelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      <div>
        <Modal
          open={opencsv}
          onClose={handleCloseCsv}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {csvModal}
        </Modal>
      </div>
    </div>
  );
};

export default AddUserInWhiteList;
