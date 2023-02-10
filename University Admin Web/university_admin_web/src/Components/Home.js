function Home(){ 
    
    return(
        <div>
            <div class="row align-items-start">
                <div class="col">
                <img src={process.env.PUBLIC_URL + "/Img/college1.png"} />
                </div>
                <div class="col">
                <h1 style={{fontfamily: "Adamina, serif"}}>About Us</h1>
                <p style={{fontfamily: "aaa, serif"}}> MMSC was established with the aim of providing quality higher education on par with international standards. 
                    It persistently seeks and adopts innovative methods to improve the quality of higher education on a consistent basis. The campus has a cosmopolitan atmosphere 
                    with students from all corners of the globe. Experienced and learned teachers are strongly encouraged to nurture the students. The global standards set at MMSC in 
                    the field of teaching and research spur us on in our relentless pursuit of excellence. In fact, it has become a way of life for us. The highly motivated youngsters on 
                    the campus are a constant source of pride. Our Memoranda of Understanding with various international universities are our major strength. They provide for an exchange of
                    students and faculty and encourage joint research projects for the mutual benefit of these universities. Many of our students, who pursue their research projects in 
                    foreign universities, bring high quality to their work and esteem to India and have done us proud. With steady steps, we continue our march forward. We look forward to 
                    meeting you here at MMSC. </p>
                </div>
            </div>
            <div class="row align-items-start">
                <div class="col">
                <h1 style={{fontfamily: "Adamina, serif"}}>Our Vision</h1>
                <p style={{fontfamily: "aaa, serif"}}> To be a global center of academic excellence with a state of art facilities and utilizing advance educational 
                  resources for imparting research oriented activities, innovative teaching method and learning environment. To be accredited center of high standard research by 
                  identifying and foster talents for knowledge generation and balancing personal as well as professional excellence </p>
                <br/>
                <h1 style={{fontfamily: "Adamina, serif"}}>Our Mission</h1>
                <p style={{fontfamily: "aaa, serif"}}> Knowledge spreading for achievements in the International palaestra. Facilitating the integration of multi 
                  disciplinary tools, techniques and approaches for enrichment and quality enhancement to carry forward the mission of 
                  generating quality human assets for addressing the emerging demands of the Globe. </p>
                  </div>
                <div class="col">
                <img style={{margin: "139px"}} src={process.env.PUBLIC_URL + "/Img/mission.png"} />
                </div>
            </div>
        </div>
)
} 

export default Home