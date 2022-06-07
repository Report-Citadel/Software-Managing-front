/**   
 * api接口统一管理
 */
import axios from "axios";
import { Get, Post, DeleteID, PutID, GetID, GetList, Delete, Put } from './config'


//只有id可以直接传入 例如"1000007"  其他必须作为对象传入 例如{"accountNumber:1000001"}

/*Compute*/
export const GETComputed = param => GetList('/compute/compute', param);

/*Labs*/
export const GETLab = param => Get('/lab/findOne', param); //ok
export const GETLabs = param => Get('/report/findFinishedReports', param); //ok
export const POSTActivities = param => Post('/api/Activities', param); //ok
export const PUTActivitiesID = (ID, param) => PutID('/api/Activities/', ID, param); //ok
export const DELETEActivitiesID = ID => DeleteID('/api/Activities/', ID);
export const GETActivitiesID = ID => GetID('/api/Activities/', ID); //ok

/*Reports*/
export const PUTReport = param => Put('/report/update', param);

/*File*/
export const GETFiles = id => GetID('/file/findAllByCourseId?courseId=', id);

export function DownloadFile(fileName) {
    return new Promise((resolve, reject) => {
        axios.get('/student/downloadFile?filename='+fileName, { responseType: 'blob' })
            .then(response => {
                console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]), {type: 'application/pdf' });
                const link = document.createElement(fileName);
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    });
}


//Students
export const GETStudents = () => Get('/student/findAll'); //ok
export const GETStudentsID = id => GetID('/student/findOne?id=', id); //ok
export const DELETEStudent = id => DeleteID('/student/delete/', id);
export const PUTStudent = param => Put('/student/update', param);
export const POSTStudent = param => Post('/student/add', param); //ok
export const POSTStudentList = param => Post('/student/addMany', param); //ok

//Instructors
export const GETInstructorID = id => GetID('/teacher/findOne?id=', id); //ok
export const GETInstructors = () => Get('/teacher/findAll');
export const DELETEInstructor = id => DeleteID('/teacher/delete/', id);
export const PUTInstructor = param => Put('/teacher/update', param);
export const POSTInstructor = param => Post('/teacher/add', param); //ok
export const POSTInstructorList = param => Post('/teacher/addMany', param); //ok

/*CreditRecords*/
export const GETCreditRecords = param => Get('/api/creditrecords', param) //ok
export const POSTCreditRecords = param => Post('/api/creditrecords', param) //ok
export const GETCreditRecordsID = ID => GetID('/api/creditrecords/', ID) //ok

/*DefaultOccupyTime*/
export const GETDefaultOccupyTime = param => Get('/api/DefaultOccupyTimes', param); //ok
export const POSTDefaultOccupyTime = param => Post('/api/DefaultOccupyTimes', param); //ok
export const DELETEDefaultOccupyTime = param => Delete('/api/DefaultOccupyTimes', param); //ok

// ExamineAndApproves
export const GETExamineAndApproves = param => Get('/api/ExamineAndApproves', param); //ok
export const POSTExamineAndApproves = param => Post('/api/ExamineAndApproves', param); //ok
export const GETExamineAndApprovesID = ID => GetID('/api/ExamineAndApproves/', ID) //ok
export const PUTExamineAndApprovesID = (ID, param) => PutID('/api/ExamineAndApproves/', ID, param); //ok
export const DELETEExamineAndApprovesID = ID => DeleteID('/api/ExamineAndApproves/', ID); //ok

//FeedbackRecords
export const GETFeedbackRecords = param => Get('/api/FeedbackRecords', param); //ok
export const POSTFeedbackRecords = param => Post('/api/FeedbackRecords', param); //ok
export const GETFeedbackRecordsID = ID => GetID('/api/FeedbackRecords/', ID) //ok
// export const PUTFeedbackRecordsID = (ID, param) => PutID('/api/FeedbackRecords/', ID, param); 
export const DELETEFeedbackRecordsID = ID => DeleteID('/api/FeedbackRecords/', ID); //ok

// Courses
export const GETCourse = id => GetID('/course/findOne?id=', id);
export const GETCoursesByStudentID = params => Get('/student/findAllCourses', params);
export const GETCoursesByTeacherID = params => Get('/teacher/findAllCourses', params);

// IndoorGrounds
export const GETIndoorGrounds = param => Get('/api/IndoorGrounds', param) //ok
export const GETIndoorGroundsID = ID => GetID('/api/IndoorGrounds/', ID) //ok   
// export const POSTIndoorGrounds = param => Post('/api/IndoorGrounds', param);
export const PUTIndoorGroundsID = (ID, param) => PutID('/api/IndoorGrounds/', ID, param); //ok
// export const DELETEIndoorGroundsID = ID => DeleteID('/api/IndoorGrounds/', ID);

// StuFavorites
export const GETStuFavoritesID = ID => GetID('/api/StuFavorites/', ID); //ok
export const DELETEStuFavorites = param => Delete('/api/StuFavorites/', param); //ok
export const POSTStuFavorites = param => Post('/api/StuFavorites', param); //ok

// Admin
export const GETAdminID = id => GetID('/administrator/findOne?id=', id); //ok

//SystemAnnouncements
export const GETSystemAnnouncements = param => Get('/api/SystemAnnouncements', param); //ok
export const POSTSystemAnnouncements = param => Post('/api/SystemAnnouncements', param); //ok
export const PUTSystemAnnouncements = param => Put('/api/SystemAnnouncements', param); //ok
export const DELETESystemAnnouncements = param => Delete('/api/SystemAnnouncements', param); //ok

//Positions
export const GETPositions = param => Get('/api/Positions', param); //wy测试ok

//login
export const Login = param => Post('/login', param);
export const GETIdentity = param => Get('/api/Login/identity', param);
export const LoginTest = param => Get('/api/Login/test/student', param);
export const LoginTestOrg = param => Get('/api/Login/test/organization', param);
export const LoginTestStuID = ID => GetID('/api/Login/test/student/', ID);

//email
export const SendEmail = param => Post('/VerifyCode/getCode', param);
export const VerifyEmail = param => Post('/VerifyCode/verify', param)
//modify password
export const PUTStuPassword = param => Put('/api/Students', param);
export const PUTOrgPassword = param => Put('/api/Organizations', param);


//Teacher
export const GETTeachersID = id => GetID('/teacher/findOne?id=', id); //ok

//Section
export const GETSectionOfTeacher = id => GetID('/section/teacherSection?teacherId=', id);
export const GETSectionInfo = param => Get('/section/findOneSection', param);

//LabInstance
export const GETLabInstanceOfSection = param => Get('/labInstance/findLabInstanceOfSection', param);
export const GETLabInstanceInfo = param => Get('/labInstance/findOneInfo', param);

//Report
export const GETReportOfLabInstace = param => Get('/report/findReportsOfLabInstance', param);
export const GETOneReport = param => Get('/report/findOne', param);