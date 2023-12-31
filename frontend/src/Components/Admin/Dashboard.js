import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MetaData from "../Layout/Metadata";
import Loader from "../Layout/Loader";
import Sidebar from "./SideBar";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserSalesChart from "./UserSalesChart";
import MonthlySalesChart from "./MonthlySalesChart";
import ServiceSalesChart from "./ServiceSalesChart";

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState([]);
  //   let outOfStock = 0;
  //   services.forEach((service) => {
  //     if (service.stock === 0) {
  //       outOfStock += 1;
  //     }
  //   });
  const getAdminServices = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4001/api/v1/admin/service`,
        config
      );
      console.log(data);
      setServices(data.services);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const getAdminProjects = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4001/api/v1/admin/portfolio`,
        config
      );
      console.log(data);
      setPortfolios(data.portfolios);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const allUsers = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4001/api/v1/admin/users`,
        config
      );
      console.log(data);
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getAdminServices();
    getAdminProjects();
    // allOrders()
    allUsers();
  }, []);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>

          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Admin Dashboard"} />
              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Services
                        <br /> <b>{services && services.length}</b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/service"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                {/* <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-success o-hidden h-100"></div>
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Projects
                        <br /> <b>{projects && projects.length}</b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/portfolio"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                    </div> */}
                {/* </div> */}
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Users
                        <br /> <b>{users && users.length}</b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/users"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Portfolio
                        <br /> <b>{portfolios && portfolios.length}</b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/portfolio"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row pr-4">
                <Fragment>
                  <UserSalesChart />
                </Fragment>
                <Fragment>
                  <MonthlySalesChart />
                </Fragment>
                <Fragment>
                  <ServiceSalesChart />
                </Fragment>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
