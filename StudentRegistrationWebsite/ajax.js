$(document).ready(function(){

    // View students
    if (window.location.pathname.endsWith('view-students.html')){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:7777/students',
            success: function(studentArray) {
                var studentTable = $('#studentTable tbody');

                $.each(studentArray, function(index, student) {
                    var studentRow = '<tr>';
                    studentRow += '<td><div>' + student.id + '</div></td>';
					studentRow += '<td><div contenteditable="false">' + student.name + '</div></td>';
					studentRow += '<td><div contenteditable="false">' + student.age + '</div></td>';
					studentRow += '<td><div contenteditable="false">' + student.mobile + '</div></td>';
					studentRow += '<td><div contenteditable="false">' + student.address + '</div></td>';

                    studentRow += '<td><button class="btn btn-primary btn-sm mr-2 edit-btn">Edit</button>'; // Edit button
                    studentRow += '<button type="button" class="btn btn-danger btn-sm mr-2 delete-btn" data-id="' + student.id + '">Delete</button>';
                    studentRow += '<button class="btn btn-success btn-sm mr-2 confirm-btn" style="display:none;">Confirm</button>'; // Confirm button
					studentRow += '<button class="btn btn-warning btn-sm cancel-btn" style="display:none;">Cancel</button>'; // Cancel button
					studentRow += '</td>';
					studentRow += '</tr>';

                    studentTable.append(studentRow);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseJSON) {
                    alert('Error: ' + jqXHR.responseJSON.message);
                } else {
                    alert('An unknown error occurred.');
                }
            }
        })
    }


    $('#studentTable tbody').on('click', '.edit-btn', function(){
        var row = $(this).closest('tr');
        row.find('div[contenteditable="false"]').attr('contenteditable', 'true').addClass('editable');
        row.find('.edit-btn, .delete-btn').hide();
        row.find('.confirm-btn, .cancel-btn').show();
    });

    $('#studentTable tbody').on('click', '.delete-btn', function(){
        var studentId = $(this).data('id');
        deleteStudent(studentId);
    });

    // Confirm button event
    $('#studentTable tbody').on('click', '.confirm-btn', function(){
        var row = $(this).closest('tr');
        row.find('div[contenteditable="true"]').attr('contenteditable', 'false').removeClass('editable');
        row.find('.edit-btn, .delete-btn').show();
        row.find('.confirm-btn, .cancel-btn').hide();

        var studentData = {
            id: row.find('td:eq(0) div').text(),
            name: row.find('td:eq(1) div').text(),
            age: row.find('td:eq(2) div').text(),
            mobile: row.find('td:eq(3) div').text(),
            address: row.find('td:eq(4) div').text(),
        };

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:7777/students/' + studentData.id,
            data: JSON.stringify(studentData),
            contentType: 'application/json',
            success: function(data) {
                alert('Student update successful!');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseJSON) {
                    alert('Error: ' + jqXHR.responseJSON.message);
                } else {
                    alert('An unknown error occurred.');
                }
            }
        })
    });

    // Cancel button event
    $('#studentTable tbody').on('click', '.cancel-btn', function(){
        var row = $(this).closest('tr');
        row.find('div[contenteditable="true"]').attr('contenteditable', 'false').removeClass('editable');
        row.find('.edit-btn, .delete-btn').show();
        row.find('.confirm-btn, .cancel-btn').hide();
    });

    // Add button event
    $('.add-btn').click(function(){
        var studentTable = $('#studentTable tbody');
        var studentRow = '<tr>';
        studentRow += '<td><div class="new-field"></div></td>'; //id
        studentRow += '<td><div class="new-field" contenteditable="true"></div></td>'; //name
        studentRow += '<td><div class="new-field" contenteditable="true"></div></td>'; //age
        studentRow += '<td><div class="new-field" contenteditable="true"></div></td>'; //mobile
        studentRow += '<td><div class="new-field" contenteditable="true"></div></td>'; //address
        studentRow += '<td><button class="btn btn-success btn-sm mr-2 confirm-add-btn">Confirm</button>'; // Confirm button
        studentRow += '<button class="btn btn-warning btn-sm cancel-add-btn">Cancel</button>'; // Cancel button
        studentRow += '</td>';
        studentRow += '</tr>';
        studentTable.append(studentRow);
    });

    // Confirm add button event
    $(document).on('click', '.confirm-add-btn', function(){
        var row = $(this).closest('tr');
        var studentData = {
            id: row.find('div.new-field').eq(0).text(),
            name: row.find('div.new-field').eq(1).text(),
            age: row.find('div.new-field').eq(2).text(),
            mobile: row.find('div.new-field').eq(3).text(),
            address: row.find('div.new-field').eq(4).text(),
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:7777/students',
            data: JSON.stringify(studentData),
            contentType: 'application/json',
            success: function(data) {
                alert('Student registration successful!');
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseJSON) {
                    alert('Error: ' + jqXHR.responseJSON.message);
                } else {
                    alert('An unknown error occurred.');
                }
            }
        })
    });

    // Cancel add button event
    $(document).on('click', '.cancel-add-btn', function(){
        $(this).closest('tr').remove();
    });

    // Register student
    $("#registerForm").on("submit", function(event){
        event.preventDefault();

        var studentData = {
            id: $("#id").val(),
            name: $("#name").val(),
            age: $("#age").val(),
            mobile: $("#mobile").val(),
            address: $("#address").val(),
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:7777/students',
            data: JSON.stringify(studentData),
            contentType: 'application/json',
            success: function(data) {
                alert('Student registration successful!');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseJSON) {
                    alert('Error: ' + jqXHR.responseJSON.message);
                } else {
                    alert('An unknown error occurred.');
                }
            }
        })
    });

    // Update student
    $("#updateForm").on("submit", function(event){
        event.preventDefault();

        var studentData = {
            id: $("#id").val(),
            name: $("#name").val(),
            age: $("#age").val(),
            mobile: $("#mobile").val(),
            address: $("#address").val(),
        };

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:7777/students/' + studentData.id,
            data: JSON.stringify(studentData),
            contentType: 'application/json',
            success: function(data) {
                alert('Student update successful!');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseJSON) {
                    alert('Error: ' + jqXHR.responseJSON.message);
                } else {
                    alert('An unknown error occurred.');
                }
            }
        })
    });

    // Delete student
    function deleteStudent(id) {
        if(confirm('Are you sure you want to delete this student?')) {
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:7777/students/' + id,
                success: function(data) {
                    alert('Student deletion successful!');
                    location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseJSON) {
                        alert('Error: ' + jqXHR.responseJSON.message);
                    } else {
                        alert('An unknown error occurred.');
                    }
                }
            })
        }   
    }

    // Search student data
    $("#searchForm").on("submit", function(event){
        event.preventDefault();

        var searchCriteria = {};

        if ($("#includeID").is(':checked')) {
            var idComparison = $("input[name='idComparison']:checked").val();

            searchCriteria["id"] = $("#id").val();
            searchCriteria["idComparison"] = idComparison;
        }

        if($("#nameEqual").is(":checked")){
            searchCriteria["name"] = $("#nameEqualVal").val();
        }
        
        if ($("#includeAge").is(':checked')) {
            var ageComparison = $("input[name='ageComparison']:checked").val();

            searchCriteria["age"] = $("#age").val();
            searchCriteria["ageComparison"] = ageComparison;
        }
        
        if($("#mobileEqual").is(":checked")){
            searchCriteria["mobile"] = $("#mobileEqualVal").val();
        }

        if($("#addressEqual").is(":checked")){
            searchCriteria["address"] = $("#addressEqualVal").val();
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:7777/students/search',
            data: JSON.stringify(searchCriteria),
            contentType: 'application/json',
            success: function(studentArray) {
                var studentSearchTable = $('#studentTable tbody');
                studentSearchTable.empty();
                $.each(studentArray, function(index, student) {
                    var studentRow = '<tr>';
                    studentRow += '<td><div>' + student.id + '</div></td>';
					studentRow += '<td><div contenteditable="false">' + student.name + '</div></td>';
					studentRow += '<td><div contenteditable="false">' + student.age + '</div></td>';
					studentRow += '<td><div contenteditable="false">' + student.mobile + '</div></td>';
					studentRow += '<td><div contenteditable="false">' + student.address + '</div></td>';

                    studentRow += '<td><button class="btn btn-primary btn-sm mr-2 edit-btn">Edit</button>'; // Edit button
                    studentRow += '<button type="button" class="btn btn-danger btn-sm mr-2 delete-btn" data-id="' + student.id + '">Delete</button>';
                    studentRow += '<button class="btn btn-success btn-sm mr-2 confirm-btn" style="display:none;">Confirm</button>'; // Confirm button
					studentRow += '<button class="btn btn-warning btn-sm cancel-btn" style="display:none;">Cancel</button>'; // Cancel button
					studentRow += '</td>';
					studentRow += '</tr>';

                    studentSearchTable.append(studentRow);
                });

            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseJSON) {
                    alert('Error: ' + jqXHR.responseJSON.message);
                } else {
                    alert('An unknown error occurred.');
                }
            }
        })
    });
});