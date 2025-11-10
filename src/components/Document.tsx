import Table from 'react-bootstrap/Table';

export const  Document = ()=> {
    return(
      
        <>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Document ID</th>
          <th>Description</th>
          <th>File Path</th>
          <th>Title</th>
          <th>Upload At</th>
          <th>Project ID</th>
          <th>Uploaded By</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
        </>
    );
}