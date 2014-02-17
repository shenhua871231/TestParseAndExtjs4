Parse.initialize("v1f95tdr4iNjWN6IB1nHW3DPfpjmcvzFTHl557kO", "NwFGpE3F4BHin5FJWlLE9OLeKAGExB2MQpNQeiCg");
    
   var Student =Parse.Object.extend("Student");
	Ext.onReady(function(){
		 // create the data store
		var initData = new Array();
		var store = Ext.create('Ext.data.ArrayStore', {
			 fields: ['id','name','age','desc'],
					proxy: {
						type: 'memory',
						data : initData,
						reader : 'array'
					}
				   // autoLoad: true
		});
			//crate Grid
		Ext.create('Ext.grid.Panel',{
				title : 'Parse & EXTJS Example ',
				renderTo: Ext.getBody(),
				width:800,
				height:400,
				frame:true,
				store: store,
				tbar: [{
				text: 'addStudent',
				handler : function(){
					showContactForm();
				}},{
				text: 'Refresh',
				handler : function(){
					queryStudent();
				}}
				],
				columns: [//
					{header: "id", width: 100, dataIndex: 'id'},
					{header: "name", width: 100, dataIndex: 'name'},
					{header: "age", width: 100, dataIndex: 'age'},
					{header: "desc", width: 100, dataIndex: 'desc'},
					{header: "opt", width: 70, 
						xtype: 'actioncolumn',//Ext.grid.column.Action
						items: [{
							icon: 'images/edit.gif',//
							handler: function(grid, rowIndex, colIndex) {
								//
								var rec = grid.getStore().getAt(rowIndex);
								//alert("update " + rec.get('name'));
								updatePreStudent(rec);
							}
						},{
							icon: 'images/del.gif',//
							handler: function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								//alert("É¾³ý " + rec.get('name'));
								id = rec.get('id');
								deleteStudent(id);
							}                
						}]
					}
				]
			});	
		var win;
		var win2;
		//query all Students
		function queryStudent(){
			var query = new Parse.Query(Student);
			//query.equalTo("name", "Dan Stemkoski");
			query.find({
			  success: function(results) {
				//alert("Successfully retrieved " + results.length + " scores.");
				// Do something with the returned Parse.Object values
				var _data = format(results);
				store.loadData(_data);
			  },
			  error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			  } 
			});
		}
		//format student
		function format(results){
			var data = new Array();
			for (var i = 0; i < results.length; i++) { 
			var object = results[i];
			var stu = new Array();
			stu.push(object.id);
				stu.push(object.get('name'));
			stu.push(object.get('age'));
			stu.push(object.get('desc'));
			// alert(object.id + ' - ' + object.get('name'));
			 data.push(stu);
			}
			return data;
		}

		//showContactForm
		function showContactForm() {
		   if (!win) {
			   var form = Ext.create('Ext.form.Panel', {
					layout: 'absolute',
				   // url: 'save-form.php',
					defaultType: 'textfield',
					border: false,

					items: [{
                    name: "id",
					id:'sid',
                    xtype: "hidden"
					},{
						fieldLabel: 'name',
						fieldWidth: 60,
						msgTarget: 'side',
						allowBlank: false,
						x: 5,
						y: 5,
						id:"name",
						name: 'name',
						anchor: '-5'  // anchor width by percentage
					}, {
						fieldLabel: 'age',
						fieldWidth: 60,
						x: 5,
						y: 35,
						id:"age",
						name: 'age',
						anchor: '-5'  // anchor width by percentage
					}, {
						fieldLabel: 'desc',
						fieldWidth: 60,
						x: 5,
						y: 65,
						id:"desc",
						name: 'desc',
						anchor: '-5'  // anchor width by percentage
					}],
					buttons:[{text:"submit",handler:function(){
						saveStudent();
					}
					}]
				});
			win = Ext.widget('window', {
					title: 'Contact Us',
					closeAction: 'hide',
					width: 400,
					height: 200,
					minHeight: 200,
					layout: 'fit',
					resizable: true,
					modal: true,
					items: form
			});
		}
		win.show();
		} 
		
		//save student
		function saveStudent(){
			var student = new Student();
			var name =  Ext.getCmp("name").getValue();
			var age = Ext.getCmp("age").getValue();
			var desc = Ext.getCmp("desc").getValue();
			//alert(desc);
			student.set("name", name);
			student.set("age", age);
			student.set("desc", desc);
			student.save(null, {
			  success: function(student) {
				// Execute any logic that should take place after the object is saved.
			//	alert('New object created with objectId: ' + student.id);
				queryStudent();
				win.hide();
			  },
			  error: function(student, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and description.
				alert('Failed to create new object, with error code: ' + student.description);
			  }
			});
		}
		
		//update student
		function updateStudent(){
			var student = new Student();
			var id =  Ext.getCmp("sid").getValue();
			student.set("id", id);
			//student.set('id','dcP7EHd1Iu');
			student.save(null, {
			  success: function(student) {
				var name =  Ext.getCmp("name").getValue();
				var age = Ext.getCmp("age").getValue();
				var desc = Ext.getCmp("desc").getValue();
				student.set("name", name);
				student.set("age", age);
				student.set("desc", desc);
				student.save();
				queryStudent();
				win2.hide();
			  },
			  error: function(student, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and description.
				alert('Failed to create new object, with error code: ' + student.description);
			  }
			});
			
		}
	//updateStudent();
	
	function updatePreStudent(student){
	
		if (!win2) {
			   var form = Ext.create('Ext.form.Panel', {
					layout: 'absolute',
				   // url: 'save-form.php',
					defaultType: 'textfield',
					border: false,
					items: [{
                    name: "id",
					id:'sid',
                    xtype: "hidden"
					},{
						fieldLabel: 'name',
						fieldWidth: 60,
						msgTarget: 'side',
						allowBlank: false,
						x: 5,
						y: 5,
						id:"name",
						name: 'name',
						anchor: '-5'  // anchor width by percentage
					}, {
						fieldLabel: 'age',
						fieldWidth: 60,
						x: 5,
						y: 35,
						id:"age",
						name: 'age',
						anchor: '-5'  // anchor width by percentage
					}, {
						fieldLabel: 'desc',
						fieldWidth: 60,
						x: 5,
						y: 65,
						id:"desc",
						name: 'desc',
						anchor: '-5'  // anchor width by percentage
					}],
					buttons:[{text:"updateStudent",handler:function(){
						updateStudent();
					}
					}]
				});
			win2 = Ext.widget('window', {
					title: 'Contact Us',
					closeAction: 'hide',
					width: 400,
					height: 200,
					minHeight: 200,
					layout: 'fit',
					resizable: true,
					modal: true,
					items: form
			});
		}
		Ext.getCmp("sid").setValue(student.get('id'));
		
		Ext.getCmp("name").setValue(student.get('name'));
		Ext.getCmp("age").setValue(student.get('age'));
		Ext.getCmp("desc").setValue(student.get('desc'));
		win2.show();
	}
	
	
	function deleteStudent(id){
		if(confirm("Do you want to delete the data it?")){
			var student = new Student();
			student.set('id',id);
			student.destroy({
			  success: function(myObject) {
				// The object was deleted from the Parse Cloud.
				queryStudent();
			  },
			  error: function(myObject, error) {
				// The delete failed.
				// error is a Parse.Error with an error code and description.
			  }
			});
	   }
	
	}
	//init data from parse app
	queryStudent();
	//end Ext.onReady
	});