import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import style from './AttmsManagement.module.css';
import pagination from "../components/pagination";
import { useBoards } from "../hooks/useBoards";

const AttmsManagement = () => {
    const {boards, currentPage, pageInfo, attms, changePage, handleBoardClick, 
        handleStatusToggle, selectBoard, showModal, closeModal} = useBoards('attms');

        //보드 아이디에 맞는 사진만 솎아내기
    const getBoardAttachments = boardId => {
        return attms.filter(attm => attms.refBoardId == boardId);
    }
        //게시글에 맞는 사진 넘겨주기 (사진미리보기)
    const renderAttmsPreview = (boardId)=>{
        const boardAttms = getBoardAttachments(boardId);
        const displayAttms= boardAttms.slice(0,6);
        const hasMore = boardAttms.length > 6;

        return(
            <div className="imgDiv">
                {displayAttms.map((attm, index) => {
                    if(isImage(attm.renameName)){
                        return(
                            <div
                                key={index}
                                className={`${attm.attmLevel == 0? style.thumbnail : style.contentImg} d-inline-flex ${style['img-border']}`}
                            >
                                <img src={`/react/${attm.renameName}`} alt="" width="100%"></img>
                            </div>
                        );
                    } else {
                        return(
                            <div 
                                key={index}
                                className={`${attm.attmLevel == 0? style.thumbnail : style.contentImg} d-inline-flex ${style['img-border']}`}
                                style={{background : 'lightgray'}}
                            >
                            </div>
                        );
                    }
                })}
                {hasMore && <span>...</span>}

            </div>
        );
    }
    const isImage = fileName => {
        fileName.toLowerCase().includes('jpg')||fileName.toLowerCase().includes('png');
    }


 return (
        <>
            {/* 헤더 영역 */}
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Attachment</h1>
            </div>

            {/* 리스트 영역 */}
            <div className="row g-4 py-1 row-cols-lg-3">
                {boards.map(b => {
                    <div key={b.boardId}>
                        <div
                            className={style.content}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalCenteredScrollable"
                            onClick={handleBoardClick()}
                        >
                            <input type="hidden" className="no" value={b.boardId} />
                            {renderAttmsPreview(b.boardId)}
                            <div className="imgsDiv"></div>

                            <h3 className="fs-2 text-body-emphasis">{b.boardTitle}</h3>
                            <p
                                style={{
                                    height: "50px",
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                }}
                            ></p>
                            <p>
                                {/* 작성자 */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-person"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg>{" "}
                                <span className={`${style['attm-info']}writer`}>{b.boardWriter}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* 작성일 */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-calendar2-event"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                </svg>{" "}
                                <span className={`${style['attm-info']}createDate`}>{b.boardCreateDate}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* 조회수 */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-eye"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>{" "}
                                <span className={`${style['attm-info']}count`}>{b.boardCount}</span>
                            </p>
                        </div>
                        <button
                            className={`${b.boardStatus == 'Y' ? 'btn btn-primary' : 'btn btn-dark'} changeState`}
                            onClick={()=> handleStatusToggle(b.boardId, b.boardStatus == 'Y' ? 'N' : 'Y')}
                        >
                            {b.boardStatus == 'Y' ? ' 게시 중' : '게시 중단'}
                        </button>
                    </div>
                })}
            </div>

            <Pagination currentPage={currentPage} changePage ={changePage} pageInfo={pageInfo} />

            {/* 모달 */}
            {showModal && selectBoard && (
                <div
                    style={{ display: "block" }}
                    className="modal show"
                    id="exampleModalCenteredScrollable"
                    tabIndex="-1"
                    aria-labelledby="exampleModalCenteredScrollableTitle"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalCenteredScrollableTitle">
                                    {selectBoard.boardTitle}
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">{selectBoard.boardContent}</div>
                            <br></br>
                            {renderModalAttachments(selectBoard.boardId)}
                            <div
                                className="modal-body"
                                style={{ textAlign: "right", fontSize: "14px" }}
                            >
                                작성자 : {selectBoard.nickName}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className={
                                        selectBoard.boardStatus == "N" ? "btn btn-primary" : "btn btn-dark"
                                    }
                                    onClick={() =>
                                        selectBoard.boardStatus == "Y"
                                            ? handleStatusToggle(selectBoard.boardId, "N")
                                            : handleStatusToggle(selectBoard.boardId, "y")
                                    }
                                >
                                    {selectBoard.boardStatus == "N" ? "게시글 올리기" : "게시글 내리기"}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="model-backdrop fade show"></div>}
        </>
    )


}
   

export default AttmsManagement;
