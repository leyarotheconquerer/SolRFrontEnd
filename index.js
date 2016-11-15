// index.js
import React from "react";
import ReactDOM from "react-dom";
import {
    SolrFacetedSearch,
    SolrClient
} from "solr-faceted-search-react";

import Modal from './node_modules/react-bootstrap/lib/Modal';
import ModalHeader from './node_modules/react-bootstrap/lib/ModalHeader';
import ModalFooter from './node_modules/react-bootstrap/lib/ModalFooter';
import ModalBody from './node_modules/react-bootstrap/lib/ModalBody';
import Popover from './node_modules/react-bootstrap/lib/Popover';
import Button from './node_modules/react-bootstrap/lib/Button';
import Tooltip from './node_modules/react-bootstrap/lib/Tooltip';
import OverlayTrigger from './node_modules/react-bootstrap/lib/OverlayTrigger';
import $ from 'jquery';
import renderIf from 'render-if';

const ROOT_URL = "https://cs-lab.letu.edu:50005/solr/mail_core/select";
const ROOT_ATTACHMENT_URL = " http://cs-lab.letu.edu/~hazenjohnson/solr/";

// The search fields and filterable facets you want
const fields = [
    {label: "General Search", 		field: "*", type: "text"},
    //{label: "Advanced Entry (field:value,...)", field: "*", type: "currentQuery"},
    {label: "Sender Email Address", 	field: "sender_email_address_s", type: "text"},
    {label: "Sender Name", 	field: "sender_name_s", type: "list-facet"},
    {label: "Subject", 			field: "subject_s", 	type: "text"},
    //Note, this path field has slashes escaped
    {label: "Path", 			field: "path_s", 	type: "text"},
    {label: "Sent on", 	field: "sent_on_dt", 	type: "date-range-facet"},
];

// The sortable fields you want
const sortFields = [
    {label: "Sender Email", field: "sender_email_address_s"},
    {label: "Sent on", field: "sent_on_dt"},
    {label: "Path", field: "path_s"}
  ];

document.addEventListener("DOMContentLoaded", () => {
    // The client class
    new SolrClient({
        // The solr index url to be queried by the client
        url: ROOT_URL,
        searchFields: fields,
        sortFields: sortFields,

        // The change handler passes the current query- and result state for render
        // as well as the default handlers for interaction with the search component
        onChange: (state, handlers) =>
          // Render the faceted search component
            ReactDOM.render(
                <SolrFacetedSearch
                    {...state}
                    {...handlers}
                    bootstrapCss={true}
                    onSelectDoc={(function(doc) {
                        console.log(doc);
                        $.getJSON(ROOT_URL + '?indent=on&q=attachment_email_s:'+ doc.id + '&wt=json' , function (data) {
                              //console.log(data.response.docs);
                              var attachments = data.response.docs;
                              const MessageModal = React.createClass({
                                getInitialState() {
                                  return { showModal: true};
                                },

                                close() {
                                  this.setState({ showModal: false });
                                },

                                open() {
                                  this.setState({ showModal: true });
                                },

                                render() {
                                  const popover = (
                                    <Popover id="modal-popover" title="popover">
                                      very popover. such engagement
                                    </Popover>
                                  );
                                  const tooltip = (
                                    <Tooltip id="modal-tooltip">
                                      wow.
                                    </Tooltip>
                                  );

                                  return (
                                    <div>
                                      <Modal show={this.state.showModal} onHide={this.close}>
                                        <Modal.Header closeButton>

                                          <p>From: <strong>{doc.sender_email_address_s}</strong></p>
                                          <p>Sent on: <strong>{doc.sent_on_dt}</strong></p>
                                          <p>Path: <strong>{doc.path_s}</strong></p>
                                          <p>Subject: <strong>{doc.subject_s}</strong></p>
                                          {renderIf(attachments.length > 0)
                                            (<div>Attachments:
                                              {
                                                attachments.map(function(attachment, i){
                                                      return <a key={i} href={ROOT_ATTACHMENT_URL + doc.id + "/" + attachment.attachment_filename_s}> {attachment.attachment_filename_s}</a>;
                                                  })
                                                }
                                              </div>
                                            )
                                            }

                                        </Modal.Header>
                                        <Modal.Body>
                                          {doc.body_t}
                                        </Modal.Body>

                                      </Modal>
                                    </div>
                                  );
                                }
                              });
                              ReactDOM.render(<MessageModal />, document.getElementById('node'));
                        });
                      })}
                  />,
                  document.getElementById("app")
              )
    }).initialize(); // this will send an initial search, fetching all results from solr
});
