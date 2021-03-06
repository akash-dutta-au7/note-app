import React, { useEffect, Fragment } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import {
  getUserProfile,
  deleteAccount,
} from "../../Redux/actions/profile.action";
import { connect } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";

import DashNav from "../../Components/DashNav";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import ShowEducation from "../../Components/ShowEducation";
import ShowExperience from "../../Components/ShowExperience";
import ShowSkills from "../../Components/ShowSkills";
import ShowUser from "../../Components/ShowUser";
import Social from "../../Components/Social";

const ManageProfile = ({
  getUserProfile,
  deleteAccount,
  auth: { user },
  profile,
  loading,
}) => {
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  // if (profile) {
  //   console.log("Social", profile.userProfile.social);
  // }
  return profile === null && loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className="manage-main-body">
        {profile !== null ? (
          <Fragment>
            <DashNav />
            <div className="mp-info">
              <div className="first-card">
                <ShowUser user={user} />

                <ShowSkills
                  skills={profile.userProfile ? profile.userProfile.skills : []}
                />
                <h4 className="mp-company">
                  {profile.userProfile ? profile.userProfile.status : null} at{" "}
                  {profile.userProfile ? profile.userProfile.company : null}
                </h4>
                <Social
                  social={profile.userProfile ? profile.userProfile.social : {}}
                />
              </div>

              <div className="mp-bio">
                <h4 className="about">About</h4>
                <p className="details">
                  {profile.userProfile ? profile.userProfile.bio : null}
                </p>
              </div>
              <div className="edu-ex">
                <ShowExperience
                  experience={
                    profile.userProfile ? profile.userProfile.experience : []
                  }
                />
                <ShowEducation
                  education={
                    profile.userProfile ? profile.userProfile.education : []
                  }
                />
              </div>
              <div className="delBtn-my-2">
                <Button
                  deleteBtn
                  value="Delete Acount"
                  onClick={() => deleteAccount()}
                ></Button>
              </div>
            </div>
          </Fragment>
        ) : (
          <div>
            <Header />
            <div>
              <h1 className="large">Manage Profile</h1>
              <p className="lead">
                {" "}
                <AiOutlineUser /> Welcome {user && user.name}
              </p>
            </div>
            <div className="create-profile">
              <p>You havent't created any profile yet, please create one!</p>
              <Link to="/create-profile">
                <Button value="Create Profile" />
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="free-space"></div>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getUserProfile, deleteAccount })(
  ManageProfile
);
