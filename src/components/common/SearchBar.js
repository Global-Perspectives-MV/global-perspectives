import React, { useState } from 'react';
import { Button, Modal, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchBar = () => {
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false); // Close the modal
    navigate(`/news?category=${searchText}`);
  };

  return (
    <>
      <Button
        className="search-btn"
        variant="outline-secondary"
        onClick={handleShow}
      >
        <span className="search">Search</span>
        <AiOutlineSearch size={15} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form inline onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search..."
              className="mr-sm-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
