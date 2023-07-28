import React from 'react'

const DashboardArena = () => {
    const milestonesData = [
        { projectName: 'Project A', progress: 60 },
        { projectName: 'Project B', progress: 80 },
        { projectName: 'Project C', progress: 40 },
        { projectName: 'Project D', progress: 90 },
        { projectName: 'Project E', progress: 70 },
      ];
      const projects = [
        {
          id: '1',
          name: 'Project A',
          status: 'In Progress',
          progress: 70,
          managerId: '1',
          teamMembers: ['1', '3']
        },
        {
          id: '2',
          name: 'Project B',
          status: 'Completed',
          progress: 100,
          managerId: '2',
          teamMembers: ['1', '3']
        },
        {
          id: '3',
          name: 'Project C',
          status: 'On Hold',
          progress: 40,
          managerId: '1',
          teamMembers: ['2']
        }
      ];
      const totalTasks = 50;
  return ( 
    
    <div>
          <div className="p-4">
          {/* Add your main content here */}
          <div className="container-mx-auto"> 
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <TotalTasksChart totalTasks={totalTasks} />
            </div>
            <div className="flex-1">
                <ProjectSummaryChart />
            </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
            <MilestonesChart milestonesData={milestonesData}/>
            </div>
            <div className="flex-1">
            <TasksChart  tasksData={[
                        { label: 'Project A', assigned: 10, completed: 6 },
                        { label: 'Project B', assigned: 8, completed: 4 },
                        { label: 'Team Member X', assigned: 5, completed: 3 },
                        { label: 'Team Member Y', assigned: 7, completed: 2 },
                    ]}/>
            </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                

            </div> 
            <NewDashboard projects={projects} userId={1}/>
            </div>
            </div>
    </div>
  )
}

export default DashboardArena