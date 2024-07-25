import React from "react";
import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingComTwo from "../components/shared/LoadingComTwo";

const ManageServices = () => {
  const {
    isPending,
    isError,
    data: Services,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-services"],
    queryFn: () =>
      axios
        .get(`https://onr-backend.vercel.app/api/v1/services/my-services`, {
          withCredentials: true,
        })
        .then((response) => response.data),
  });

  const deleteModal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#19b74b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteServiceHandler(id);
      }
    });
  };

  const deleteServiceHandler = async (id) => {
    try {
      await axios.delete(`https://onr-backend.vercel.app/api/v1/services/${id}`, {
        withCredentials: true,
      });

      refetch();
      Swal.fire({
        title: "Deleted!",
        text: "Your Service has been deleted.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Sorry!",
        text: error?.message,
        icon: "error",
      });
    }
  };

  if (isPending) {
    return <LoadingComTwo />;
  }

  if (isError) {
    console.log(error?.message);
    return (
      <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
        {error?.message}
      </h2>
    );
  }

  if (!Services?.result?.length) {
    return (
      <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
        -- Service List is Empty --
      </h2>
    );
  }

  return (
    <Wrapper>
      <div className="title-row">
        Manage Services <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
      </div>
      <div className="content-row">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Published Status</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Services?.result?.map((Service, index) => {
              let i = index + 1 < 10 ? `0${index + 1}` : index + 1;
              return (
                <tr key={Service._id}>
                  <td>{i}</td>
                  <td>{Service?.titre}</td>
                  <td>{Service?.isPublished ? "Published" : "Not Published"}</td>
                  <td>{Service?.createdBy?.username}</td>
                  <td className="action-row">
                    <Link to={`/service/${Service._id}`} className="action view">
                      <MdVisibility />
                    </Link>
                    <Link
                      to={`/dashboard/edit-service/${Service._id}`}
                      className="action edit"
                    >
                      <FaRegEdit />
                    </Link>
                    <button
                      className="action delete"
                      onClick={() => deleteModal(Service._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .title-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: calc(0.9rem + 0.4vw);
    text-transform: capitalize;
    letter-spacing: 1px;
    font-weight: 600;
    opacity: 0.85;
    color: var(--color-black);
    position: relative;
  }
  .title-row:before {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: calc(30px + 0.7vw);
    height: calc(2px + 0.1vw);
    background-color: var(--color-primary);
  }
  .content-row {
    overflow-x: auto;
    margin-top: calc(2rem + 0.5vw);
  }
  .table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .table thead {
    background-color: var(--color-accent);
    color: var(--color-white);
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 400;
    text-transform: capitalize;
  }
  .table th,
  .table td {
    text-align: left;
    padding: 12px;
  }
  .table tbody tr {
    font-size: 15px;
    font-weight: 400;
    text-transform: capitalize;
    letter-spacing: 1px;
    transition: all 0.2s linear;
  }
  .table tbody tr:nth-child(even) {
    background-color: #00000011;
  }
  .table .action-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    column-gap: 12px;
  }
  .table .action-row .action {
    font-size: 21px;
  }
  .action.view {
    color: #22d637;
  }
  .action.edit {
    color: #f1c72f;
  }
  .action.delete {
    color: #f1322f;
  }
`;

export default ManageServices;
