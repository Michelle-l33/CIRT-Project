import styles from './TabNav.module.css';
import Submission from "./Submission";
import TabHeader from './TabHeader';
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";

const Unassigned = () => {
    const [submissionList, setSubmissionList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editors, setEditors] = useState([]);
    const [showEditorDropdown, setShowEditorDropdown] = useState(null);
    const dropdownRef = useRef(null);

    // Fetch unassigned submissions
    useEffect(() => {
        const fetchUnassigned = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://cirt-project-server.vercel.app/submission/unassigned');
                
                if (!response.ok) throw new Error('Failed to fetch submissions');
                
                const data = await response.json();
                if (!Array.isArray(data)) throw new Error('Unexpected data format');
                
                setSubmissionList(data);
                setFilteredList(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching submissions:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUnassigned();
    }, []);

    // Fetch all editors
    useEffect(() => {
        const fetchEditors = async () => {
            try {
                const response = await fetch('https://cirt-project-server.vercel.app/user/');
                if (!response.ok) throw new Error('Failed to fetch editors');
                
                const data = await response.json();
                const editorUsers = data.filter(user => user.isEditor);
                setEditors(editorUsers);
            } catch (error) {
                console.error("Error fetching editors:", error);
            }
        };
        fetchEditors();
    }, []);

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowEditorDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAssignEditor = async (submissionId, editorId) => {
        try {
          const response = await fetch(`https://cirt-project-server.vercel.app/submission/${submissionId}/assign-editor`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ editorId }),
            mode: 'cors',
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to assign editor');
          }
      
          // Update state - removed stage change
          setSubmissionList(prev => prev.map(sub => 
            sub._id === submissionId ? { ...sub, editorID: editorId } : sub
          ));
          setFilteredList(prev => prev.map(sub => 
            sub._id === submissionId ? { ...sub, editorID: editorId } : sub
          ));
          
          setShowEditorDropdown(null);
        } catch (error) {
          console.error("Error assigning editor:", error.message);
        }
      };

    const optionList = [
        {
            name: "View in Detail",
            element: (submission) => (
                <Link to={`/Gallery/submission/${submission._id}`} target="_blank">
                    View in Detail
                </Link>
            )
        },
        {
            name: "Assign Editor",
            function: (submission) => setShowEditorDropdown(submission._id)
        }
    ];

    if (isLoading) return <div className={styles.loading}>Loading submissions...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.tab}>
            <TabHeader 
                tabHeader="Unassigned Submissions" 
                submissionList={submissionList} 
                setFilteredList={setFilteredList}
            />

            <ul className={styles.submissionList}>
                {filteredList.length > 0 ? (
                    filteredList.map((submission) => (
                        <li key={submission._id} className={styles.submissionListItem}>
                            <Submission 
                                submission={submission} 
                                optionList={optionList}
                            />
                            
                            {/* Editor dropdown menu */}
                            {showEditorDropdown === submission._id && (
                                <div ref={dropdownRef} className={styles.editorDropdown}>
                                    <div className={styles.dropdownHeader}>Assign to Editor:</div>
                                    <ul className={styles.editorList}>
                                        {editors.map(editor => (
                                            <li key={editor._id} onClick={() => handleAssignEditor(submission._id, editor._id)} className={styles.editorItem}>
                                                {editor.name} ({editor.email})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <span>No unassigned submissions found</span>
                )}
            </ul>
        </div>
    );
};

export default Unassigned;