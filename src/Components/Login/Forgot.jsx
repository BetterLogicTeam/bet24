import React from 'react'
import site_main_logo from "../Assets/bet21-logo.png"
import {FaHandPointDown, FaKey, FaUser} from "react-icons/fa"

function Forgot() {
  return (
    <div className='main_loginPage'>

<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-4">
			<div className='text-center'>
				<img  className="w-50" src={site_main_logo} alt="" />
			</div>
				<div class="login_form new_login_form ">
				    <h1>Recover Password</h1>
				    {/* <p>To Keep connected with us please login with your personal info.</p> */}
				    <form>
			            <div class="form-group">
					        {/* <label for="email">Enter Login Id</label> */}
							<div className="inpuT_main_div mt-4	">

					        <input type="text" class="form-control" placeholder="Login Id" name="loginId" />
							<FaUser className="input_icons"></FaUser>
							</div>
					    </div>

			            <div class="login_btn">
			            	<button type="button" class="btn button btn-block">Recover password </button>
			            </div>
			            <p>Don’t have an account yet? <a href="/Registration">Sign Up</a></p>
			        </form>	
				</div>
			</div>
			{/* <div class="col-md-6">
				<div class="login_img">
					<img src="assets/images/login_img.png" />
				</div>
			</div> */}
		</div>
	</div>

    </div>
  )
}

export default Forgot