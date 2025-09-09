import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useBoards = (fetchUrl) => {
    const [boards, setBoards] = useState([]);
     const [searchParams, setSearchParams] = useSearchParams(); // URL의 쿼리 파라미터 관리
    const currentPage = parseInt(searchParams.get('page') || '1');
    const [pageInfo, setPageInfo] = useState(null);
    


    useEffect(() => {
        fetchBoards(currentPage);
    }, [currentPage]);

    const [attm, setAttm] = useState([]); // attmList 초기화
    const fetchBoards = (page) => {
        fetch(`/react/admin/${fetchUrl}?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setBoards(data.list);
                setPageInfo(data.pi);
                if(data.aList){
                    setAttm(data.aList);
                }
            })
            .catch(err => console.log(err));
    }
     const changePage = page => {
        setSearchParams({page:page.toString()})
    }

    const handleStatusToggle = (id, value) => {
        fetch('/react/admin/status', {
            method:'put',
           headers : {'content-Type':'application/json; charset=UTF-8'},
            body:JSON.stringify({
                id:id,
                status:value
            })
        }) 
        .then(res=> res.json())
        .then(data=>{
            if(data == 1){
                setBoards(prev => prev.map(b=>
                    b.boardId == id ? {...b, boardStatus:value} : b
                ))

                if(showModal && selectBoard.boardId == id){
                    selectBoard({...selectBoard, boardStatus:value})
                }
            } else {
                alert('상태변경을 실패하여 페이지가 새로고침됩니다.');
                location.reload();
            }
        })
         .catch(err => console.log(err))
    }
    const [selectBoard, setSelectBoard] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleBoardClick = board => 
      //내가 클릭한 글에 대한 정보 불러오기 모달로 보여주기
        setSelectBoard(board);
        setShowModal(true);

    const closeModal = () => {
        setShowModal(false);
        setSelectBoard(null);
    }

    return{
        boards, currentPage,pageInfo, attms,
        changePage, handleStatusToggle, selectBoard,
        showModal, handleBoardClick, closeModal
    }

}