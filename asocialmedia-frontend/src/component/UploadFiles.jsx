import React, { Component } from "react";
import UploadFilesService from '../service/UploadFilesService.js';

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.refreshFiles = this.refreshFiles.bind(this);
    this.deleteFileClicked = this.deleteFileClicked.bind(this);
    this.deleteFilesClicked = this.deleteFilesClicked.bind(this);

    this.state = {
      selectedFiles: undefined,
      selectedFile: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };
  }

  componentDidMount() {
    UploadFilesService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  refreshFiles() {

    UploadFilesService.getFiles().
      then((response) => {
        this.setState({
          fileInfos: response.data,
        });
      });
  }

  deleteFileClicked(event) {

    //alert(event.target.value)

    setTimeout(() => this.setState({
      selectedFile: event.target.value,
    }), 1000);

    setTimeout(() =>

    UploadFilesService.deleteFile(JSON.stringify(this.state.selectedFile)).
        then(() => {
          console.log("ok");
          this.refreshFiles();
        })
      , 2000);
  }

  deleteFilesClicked() {

    //alert("entro qui?");
    UploadFilesService.deleteFiles().
      then(() => {
        this.refreshFiles();
      });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadFilesService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadFilesService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      selectedFile,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
      <div className="page">
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  {((file.name).includes("png") || (file.name).includes("jpg") ?
                    <span><a href={file.url}>
                      <img src={file.name} /></a>
                      <button className="btn btn-success" value={file.name} onClick={this.deleteFileClicked}>Delete</button>
                    </span> : null)}
                </li>
              ))}
          </ul>
        </div>

        <br></br>
        <button className="btn btn-success" onClick={this.deleteFilesClicked}>Delete All</button>

      </div>
    );
  }
}