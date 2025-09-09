import { useEffect, useState } from "react";
import { useSearchParams} from "react-router-dom";
import common from './PagesCommon.module.css';

const BoardManagement = () => {
    const [boards, setBoards] = useState([]); //boardList배열 초기화
    const [searchParams, setSearchParams] = useSearchParams(); //URL의 쿼리 파라미터 관리
    const currentPage = parseInt(searchParams.get('page') || '1');
    const [pageInfo, setPageInfo] = useState(null);

    /*
    /boardspage=1&status='Y'
        searchParams.get(page') => 2
        searchParams.get('status')=>Y
        searchParams.get('title') => null

        setSearchParams(page:'3'}) => /boardspage=3

    */
 
    useEffect(()=>{
        fetchBoards(currentPage);
    }, [currentPage])

    const fetchBoards =page => {
         fetch(`/react/admin/boards?page=${page}`)
        .then(res=> res.json())
        .then(data=> {
            //pi, list를 map에 담아서 받아와서 뿌려주기
            setBoards(data.list);
            setPageInfo(data.pi);
        })
        .catch(err => console.log(err))

    }
    const changePage = page => {
        setSearchParams({page:page.toString()})
    }

    const handleStatusToggle = (id, value)=>{
        fetch('/react/admin/status', {
            method:'put',
            headers : {'content-Type':'application/json; charset=UTF-8'},
            body:JSON.stringify({
                id:id,
                status:value
            })
        })
        .then(res=>res.json())
        .then(data => {
            if(data == 1){
                setBoards(prev => prev.map(b =>
                    b.boardId == id
                    ? {...b, boardStatus:value} : b
                ))

                if(selectBoard && selectBoard.boardId == id){
                    setSelectBoard({...selectBoard.boardStatus(value)})
                }
            } else {
                alert('상태변경을 실패하여 페이지를 새로고침합니다')
                location.reload();
            }
     })
        .catch(err => console.log(err))
    }


    const [selectBoard, setSelectBoard] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleBoardClick = (board) => {
        //내가 클릭한 글에 대한 정보 불러오기 모달로 보여주기
        setSelectBoard(board);
        setShowModal(true);

    }

    const closeModal = () => {
        setShowModal(false);
        setSelectBoard(null);
    }
    


    return(

        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Boards</h1>
            </div>
            
            <div className="bd-example">
                <table className={`table table-hover ${common.table}`} style={{textAlign:'center'}}>
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>TITLE</th>
                            <th>WRITER</th>
                            <th>CREATE</th>
                            <th>MODIFY</th>
                            <th>VIEWS</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {boards.map(board=>(
                            <tr key={board.boardId}>
                            <td onClick = {()=> handleBoardClick(board)}>{board.boardId}</td>
                            <td onClick = {()=> handleBoardClick(board)}>{board.boardTitle}</td>
                            <td onClick = {()=> handleBoardClick(board)}>{board.nickName}</td>
                            <td onClick = {()=> handleBoardClick(board)}>{board.boardCreateDate}</td>
                            <td onClick = {()=> handleBoardClick(board)}>{board.boardModifyDate}</td>
                            <td onClick = {()=> handleBoardClick(board)}>{board.boardCount}</td>
                            <td>
                                <div 
                                    className={board.boardStatus == 'Y'? common.select: '' }
                                    onClick = {() => board.boardStatus == 'N'? handleStatusToggle(board.boardId, 'Y') : null}
                                    >Y</div>
                                <div 
                                    className={board.boardStatus == 'N'? common.select : '' }
                                    onClic ={() => board.boardStatus == 'Y'? handleStatusToggle(board.boardId, 'N') : null}
                                    >N</div>
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
          
            
           
           {/* pageInfo가 있어야만 작동하도록(없으면 null이라 오류나니까)하기 : 조건부 렌더링 */}
            <Pagination currentPage={currentPage} changePage ={changePage} pageInfo={pageInfo} />

            

            {showModal && selectBoard && (
            <div style={{display:'block'}} className="modal show" id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalCenteredScrollableTitle">{selectBoard.boardTitle}</h1>
                            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{selectBoard.boardContent}</div>
                        <br></br>
                        
                        <div className="modal-body" style={{textAlign: 'right' , fontSize: '14px'}}>작성자 : {selectBoard.nickName}</div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className={selectBoard.boardStatus == 'N' ? 'btn btn-primary' : 'btn btn-dark'}
                                onClick={()=> selectBoard.boardStatus == 'Y' ? handleStatusToggle(selectBoard.boardId, 'N') : handleStatusToggle(selectBoard.boardId, 'y')}
                                >
                                    {selectBoard.boardStatus == 'N' ? '게시글 올리기': '게시글 내리기'}</button>
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
         )}
         {showModal && <div className="model-backdrop fade show"></div>}
    </>
    )
   
}

export default BoardManagement;