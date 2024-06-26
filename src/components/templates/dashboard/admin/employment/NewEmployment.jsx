import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Divider } from "@mui/material";
import { IoPerson } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { showToast } from "@/components/module/AuthModules/Toastify";
import InputContact from "@/components/module/input_module/InputContact";
import { adminCategories } from "../../Categories";
import EmploymentDetailCard from "@/components/module/employment_module/EmploymentDetailCard";
import Loading from "@/components/helper/Loading";

function NewEmployment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [users, setUsers] = useState([]);

  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [jobBranch, setJobBranch] = useState("");
  const [jobPlace, setJobPlace] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobTime, setJobTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First request to get the user ID
        const responseToken = await axios.get(
          "http://localhost:3001/api/dashboard/whoami",
          {
            withCredentials: true,
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
            },
          }
        );
        const { id } = responseToken.data;
        setUserRole(responseToken.data.role);
        setUserId(responseToken.data.id);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setUserRole("error");
      }
    };

    fetchData(); // Call the function
  }, []);

  const [setting, setSetting] = useState(false);
  const mobileSetting = () => {
    setSetting((e) => !e);
  };

  const insertHandler = async () => {
    if (
      jobBranch === "" ||
      jobPlace === "" ||
      jobTime === "" ||
      jobTitle === ""
    ) {
      showToast("لطفا تمامی فیلد هارا پرکنید.", "error");
    }

    const response2 = await axios
      .post(
        "http://localhost:3001/api/admin/panel/employment",
        {
          branch: jobBranch,
          jobCategory: jobBranch,
          jobPlace: jobPlace,
          jobTitle: jobTitle,
          jobTime: jobTime,
        },
        {
          withCredentials: true,
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
          },
        }
      )
      .then((res) => {
        showToast(
          "موقعیت شغلی جدید با موفقیت ثبت شد. بعد از تایید ادمین در سایت قرار میگیرد.",
          "success"
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <form
          dir="rtl"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <InputContact
            id={"branch"}
            variable={jobBranch}
            setVariable={setJobBranch}
            subTitle={"محصول، آموزش، مارکتینگ، منابع انسانی، مالی"}
            title={"شاخه"}
            type={"text"}
            width={"100%"}
          />
          <InputContact
            id={"place"}
            variable={jobBranch}
            setVariable={setJobBranch}
            title={"دسته بندی"}
            type={"text"}
            width={"100%"}
          />
          <InputContact
            id={"category"}
            variable={jobPlace}
            setVariable={setJobPlace}
            title={"محل کار"}
            type={"text"}
            width={"100%"}
          />
          <InputContact
            id={"title"}
            variable={jobTitle}
            setVariable={setJobTitle}
            title={"عنوان کار"}
            type={"text"}
            width={"100%"}
          />
          <InputContact
            id={"time"}
            variable={jobTime}
            setVariable={setJobTime}
            subTitle={"تمام وقت، پاره وقت و.."}
            title={"بازه زمانی"}
            type={"text"}
            width={"100%"}
          />

          <Divider />
          <h3>نمونه کارت</h3>
          <EmploymentDetailCard
            job={jobTitle}
            time={jobTime}
            place={jobPlace}
            category={jobBranch}
          />

          <button
            className="login_Btn_No_Hid"
            onClick={insertHandler}
            style={{
              width: "fit-content",
              marginTop: "2rem",
              cursor: "pointer",
            }}
            type="button"
          >
            ثبت اطلاعات نوشته شده
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </form>
      )}
      {/* Responsive */}

      <div className="MobileDrawerDash">
        <button onClick={mobileSetting} className="drawerButton">
          {" "}
          <IoPerson style={{ width: 20, height: 20 }} />
        </button>
      </div>

      <Drawer anchor="left" open={setting} onClose={() => setSetting(false)}>
        <Box>
          <ul className="dashboardList">
            {adminCategories.map((item) => (
              <li key={item.title}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </Box>
      </Drawer>

      {/* Responsive */}
    </div>
  );
}

export default NewEmployment;
